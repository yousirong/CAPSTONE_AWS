from glob import glob
from lib2to3.pgen2 import driver
from modulefinder import STORE_NAME
from os import link
import time
from warnings import catch_warnings
from idna import valid_contextj
from selenium.webdriver.support.ui import WebDriverWait
from xml.dom.minidom import Element
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC #selenium에서 사용할 모듈 import
from selenium.common.exceptions import ElementNotInteractableException
from bs4 import BeautifulSoup
import requests
import soupsieve
#크롬 열기
service = Service('./chromedriver')
driver = webdriver.Chrome(service=service)
driver.implicitly_wait(4)
driver.get("https://map.naver.com/v5/") #네이버 신 지도 url 실행
try:
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "input_search"))
) #입력창이 뜰 때까지 대기
finally:
    pass
    
#검색창
search_box = driver.find_element(by=By.CLASS_NAME,value='input_search')
search_box.send_keys("강남구 맛집")
search_box.send_keys(Keys.ENTER) #검색창에 "검색어" 입력
driver.implicitly_wait(10) #화면 표시 기다리기 
driver.switch_to.frame('searchIframe') #첫페이지 Iframe

#//*[@id="_pcmap_list_scroll_container"]/ul/li[1]/div/a/div   ---> 반복문 li[i]로 리스트 내려가기
place_list= driver.find_element(by=By.XPATH,value='//*[@id="_pcmap_list_scroll_container"]/ul/li[1]/div/a/div').click()
driver.switch_to.default_content() #Iframe 초기화
driver.implicitly_wait(10)
driver.switch_to.frame('entryIframe') #상세페이지 Iframe
driver.implicitly_wait(10)


try: #홈메뉴
    driver.find_element(by=By.XPATH,value="//*[@id='app-root']/div/div/div/div[5]/div/div/div/div/a[1]/").click()
    driver.implicitly_wait(10)
except:
    pass
#데이터 크롤링
#매장이름
try:
    name = driver.find_element(by=By.XPATH,value="//*[@id='_title']/span[1]").text
except:
    name = ''
#업종
try:
    category = driver.find_element(by=By.XPATH,value="//*[@id='_title']/span[2]").text
except:
    category = ''
#별점
try:
    review = driver.find_element(by=By.XPATH,value="//*[@id='app-root']/div/div/div/div[2]/div[1]/div[2]/span[1]/em").text
except:
    review = ''
#리뷰 개수
try:
    review_count = driver.find_element(by=By.CLASS_NAME,value="place_section_count").text
except:
    review_count = ''
#대표번호
try:
    phone_number = driver.find_element(by=By.CLASS_NAME,value="_3ZA0S").text
except:
    phone_number = ''
#운영시간
try:
    driver.find_element(by=By.CLASS_NAME,value="_2ZP3j").click()
    open_time = driver.find_elements(by=By.CLASS_NAME,value="_20Y9l")
except:
    open_time = ''
open_time_list = []
for x in open_time:
    open_time_list.append(x.text.split('\n'))

z = open_time_list[-1][-1]
open_time_list.pop()
#홈페이지 링크
try:
    link_url = driver.find_element(by=By.CSS_SELECTOR,value="a._1RUzg").text
except:
    link_url = ''
#도로명, 지번
try:
    driver.find_element(by=By.CLASS_NAME,value="_1Gmk4").click()  #펼치기를 해야 지번까지 담아올수 있다.
    location = driver.find_elements(by=By.CLASS_NAME,value="TDq8t") #도로명, 지번 크롤링
except:
    location = ''
#String 으로 받는듯 하다.
location_list = []
for x in location:
    location_list.append(x.text.strip('복사').strip('도로명').strip('지번'))
#스토어 코드
store_code = ''
url = driver.current_url
code = url.split('/')[7]
for x in range(len(code)):
    if code[x] == '?':
        break
    store_code += code[x]
#매장사진 3개 _3aXen
try:
    driver.find_element(by=By.XPATH,value="//*[contains(text(), '사진')]").click()
    place_view =[]
    for i in range(3):
        try:
            img = driver.find_element(by=By.ID,value='visitor_'+ str(i + 1) + '')
            driver.implicitly_wait(10)
            place_view.append(img.get_attribute('src'))
        except:
            break
except:
    place_view = ''
#메뉴이름 가격

 
print("매장이름 : ", name)
print("업종 : ",category)
print("별점 : ",review)
print("리뷰개수 : ", review_count)
print("대표번호 : ",phone_number)
print("스토어 코드 : ", store_code)
print("운영시간:" ,open_time_list)
print("홈페이지링크:" ,link_url)
print("방문 사진" ,place_view)
print("메뉴 : ")
print("주소 : ", location_list)



crawling(place_lists)
search_box.clear()

    #페이지 넘기기
try:
    for j in range(2,6):
        page = driver.find_element(by=By.XPATH,value='//*[@id="app-root"]/div/div[2]/div[2]/a[' + str(j+1) + ']')
        page.send_keys(Keys.ENTER)
        driver.implicitly_wait(10)

        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        place_lists = soup.select('_1EKsQ _12tNp') #장소리스트 class

        crawling(place_lists)
except ElementNotInteractableException:
    print('not found')
finally:
    search_box.clear()
    
def crawling(placeLists):
    for i, place in enumerate(placeLists):
        menuInfos = getMenuInfo(i)
        print(menuInfos)

#상세페이지 가서 크롤링
def getMenuInfo(i):
    detail_store_xpath = '//*[@id="_pcmap_list_scroll_container"]/ul/li[' + str(i +1) +']/div[1]'
    driver.find_element(by=By.XPATH,value=detail_store_xpath).send_keys(Keys.ENTER)
    driver.implicitly_wait(10)
    driver.switch_to.default_content() #Iframe 초기화
    driver.implicitly_wait(10)
    driver.switch_to.frame('entryIframe') #상세페이지 Iframe
    driver.implicitly_wait(10)

    menuInfos =[]
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    #메뉴 타입
    return menuInfos


