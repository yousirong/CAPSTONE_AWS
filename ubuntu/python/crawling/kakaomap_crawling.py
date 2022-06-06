from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time
import pymysql
import warnings
warnings.filterwarnings('ignore')


options = webdriver.ChromeOptions()
options.add_argument('headless')
#options.add_experimental_option("excludeSwitches", ["enable-logging"])     

chromedriver = '/home/ubuntu/chromedriver' # ec2
#chromedriver="C:\Webdriver/chromedriver" # local
 
gu_list = ['서울 마포구', '서울 서대문구','서울 강남구','서울 종로구','서울 중구','서울 용산구','서울 성동구','서울 광진구',
           '서울 동대문구','서울 성북구','서울 강북구','서울 도봉구','서울 노원구','서울 중랑구','서울 강동구','서울 송파구',
           '서울 은평구','서울 서초구','서울 관악구','서울 동작구','서울 영등포구','서울 금천구','서울 구로구','서울 양천구',
           '서울 강서구', '인천 중구', '인천 동구', '인천 미추홀구', '인천 연수구', '인천 남동구', '인천 부평구', '인천 계양구', 
           '인천 서구', '부산 중구', '부산 서구', '부산 동구', '부산 영도구', '부산 부산진구', '부산 동래구', '부산 남구', '부산 북구', 
           '부산 해운대구', '부산 사하구', '부산 금정구', '부산 강서구', '부산 연제구', '부산 수영구', '부산 사상구', '대구 중구', 
           '대구 동구', '대구 서구', '대구 남구', '대구 북구', '대구 수성구', '대구 달서구', '광주 동구', '광주 서구', '광주 남구', 
           '광주 북구', '광주 광산구', '대전 동구', '대전 중구', '대전 서구', '대전 유성구', '대전 대덕구', '울산 중구', '울산 남구', 
           '울산 동구', '울산 북구', '세종시', '경기 수원시', '경기 성남시', '경기 의정부시', '경기 안양시', '경기 부천시', '경기 광명시', 
           '경기 평택시', '경기 동두천시', '경기 안산시', '경기 고양시', '경기 과천시', '경기 구리시', '경기 남양주시', '경기 오산시', 
           '경기 시흥시', '경기 군포시', '경기 의왕시', '경기 하남시', '경기 용인시', '경기 파주시', '경기 이천시', '경기 안성시', '경기 김포시',
           '경기 화성시', '경기 광주시', '경기 양주시', '경기 포천시', '경기 여주시', '강원 춘천시', '강원 원주시', '강원 강릉시', '강원 동해시',
           '강원 태백시', '강원 속초시', '강원 삼척시', '제주도 제주시', '제주도 서귀포시', '충북 청주시', '충북 충주시', '충북 제천시', 
           '충남 천안시', '충남 공주시', '충남 보령시', '충남 아산시', '충남 서산시', '충남 논산시', '충남 계룡시', '충남 당진시', '전북 전주시',
           '전북 군산시', '전북 익산시', '전북 정읍시', '전북 남원시', '전북 김제시', '전남 목포시', '전남 여수시', '전남 순천시', '전남 나주시', 
           '전남 광양시', '경북 포항시', '경북 경주시', '경북 김천시', '경북 안동시', '경북 구미시', '경북 영주시', '경북 영천시', '경북 상주시',
           '경북 문경시', '경북 경산시', '경남 창원시', '경남 진주시', '경남 통영시', '경남 사천시', '경남 김해시', '경남 밀양시', '경남 거제시', 
           '경남 양산시']

keywords = ['한식', '중식', '일식', '양식', '동남아음식', '제과', '떡', '카페', '스터디카페', '치킨', '분식', '유흥주점', 
            '노래방', '호프',  '게스트하우스', '모텔', '호텔', '고시원', '컴퓨터수리', '의류수선', '미용실', '이발소',
            '네일샵', '피부관리', '세탁소', '유치원', '수학학원', '영어학원', '피아노학원', '미술학원', '어린이집', '독서실',
            '과일가게', '정육점', '문방구', '철물', '옷가게', '꽃집', '골프연습장', '당구장', '헬스클럽']

while(1):
    for gu in gu_list:
        for keyword in keywords:

            search_word = gu + ' ' + keyword
            
            db = pymysql.connect(host='15.165.215.193', port=3306, user='root', passwd='9*=995LHp!hD6zksp!?K', db='hufs', charset='utf8')
            cursor = db.cursor()  

            driver = webdriver.Chrome(chromedriver, options=options)
            driver.get("https://map.kakao.com/")    
            
            def save_menu(menu_li):
                sql="""SELECT COUNT(*) FROM kakao_menu WHERE store_code = '""" + str(menu_li[0]) + """' and menu_name = '""" + menu_li[1] + """';"""
                cursor.execute(sql)
                result = cursor.fetchone()
                print ("result[0]=", result[0])

                # menu_name 중복 아니면 insert
                if result[0] == 0:
                    sql = """INSERT INTO kakao_menu (store_code, menu_name, price) VALUES(""" + str(menu_li[0]) + """,
                    '""" + menu_li[1] + """',  
                    """ + str(menu_li[2]) + """)"""
                    cursor.execute(sql)     

            def save_data(data_li):
                sql="""SELECT COUNT(*) FROM kakao_data WHERE store_code = '""" + str(data_li[2]) + """';"""
                cursor.execute(sql)
                result = cursor.fetchone()
                print ("result[0]=", result[0])

                # store_code 중복 아니면 insert
                if result[0] == 0:
                    sql = """INSERT INTO kakao_data(store_name, sub_category, store_code, rating, review_count, address, otheraddress, opening_hours, telephone, homepage, search_word, img_url1, img_url2, img_url3) VALUES('""" + data_li[0] + """',
                    '""" + data_li[1] + """', 
                    """ + str(data_li[2]) + """, 
                    """ + str(data_li[3]) + """, 
                    """ + str(data_li[4]) + """, 
                    '""" + data_li[5] + """',
                    '""" + data_li[6] + """',
                    '""" + data_li[7] + """',
                    '""" + data_li[8] + """',
                    '""" + data_li[9] + """',
                    '""" + data_li[10] + """',
                    '""" + data_li[11] + """',
                    '""" + data_li[12] + """',
                    '""" + data_li[13] + """')"""
                    cursor.execute(sql)
                else:
                    sql = """UPDATE kakao_data SET store_name = '""" + data_li[0] + """',
                    sub_category = '""" + data_li[1] + """',
                    rating = """ + str(data_li[3]) + """,
                    review_count = """ + str(data_li[4]) + """,
                    address = '""" + data_li[5] + """',
                    otheraddress = '""" + data_li[6] + """',
                    opening_hours = '""" + data_li[7] + """',
                    telephone = '""" + data_li[8] + """',
                    homepage = '""" + data_li[9] + """',
                    img_url1 = '""" + data_li[11] + """',
                    img_url2 = '""" + data_li[12] + """',
                    img_url3 = '""" + data_li[13] + """' WHERE store_code = """ + str(data_li[2]) + """;"""
                    cursor.execute(sql)
            
            def get_img(data_li):
                img_li = []
                img_links = driver.find_elements_by_css_selector("div.photo_area a.link_photo")
                    
                if len(img_links) == 0:
                    img_link1 = 'NULL'
                    img_li.append(img_link1)
                    img_link2 = 'NULL'
                    img_li.append(img_link2)
                    img_link3 = 'NULL'
                    img_li.append(img_link3)
                elif len(img_links) == 1:
                    img_link1 = img_links[0].value_of_css_property("background-image").split('"')[1]
                    if len(img_link1) > 800:
                        img_link1 = 'NULL'
                    img_li.append(img_link1)
                    img_link2 = 'NULL'
                    img_li.append(img_link2)
                    img_link3 = 'NULL'
                    img_li.append(img_link3)
                elif len(img_links) == 2:
                    img_link1 = img_links[0].value_of_css_property("background-image").split('"')[1]
                    if len(img_link1) > 800:
                        img_link1 = 'NULL'
                    img_li.append(img_link1)
                    img_link2 = img_links[1].value_of_css_property("background-image").split('"')[1]
                    if len(img_link2) > 800:
                        img_link2 = 'NULL'
                    img_li.append(img_link2)
                    img_link3 = 'NULL'
                    img_li.append(img_link3)
                else:
                    img_link1 = img_links[0].value_of_css_property("background-image").split('"')[1]
                    if len(img_link1) > 800:
                        img_link1 = 'NULL'
                    img_li.append(img_link1)
                    img_link2 = img_links[1].value_of_css_property("background-image").split('"')[1]
                    if len(img_link2) > 800:
                        img_link2 = 'NULL'
                    img_li.append(img_link2)
                    img_link3 = img_links[2].value_of_css_property("background-image").split('"')[1]
                    if len(img_link3) > 800:
                        img_link3 = 'NULL'
                    img_li.append(img_link3)

                data_li.extend(img_li)
                print(data_li)
                save_data(data_li)
                

            def get_menu(data_li):
                menuInfos = []
                html = driver.page_source
                soup = BeautifulSoup(html, 'html.parser')
                # 메뉴의 3가지 타입
                menuonlyType = soup.select('.cont_menu > .list_menu > .menuonly_type')
                for menu in menuonlyType:
                        kakao_menu.append(_getMenuInfo(menu, data_li))
                        menuInfos.append(_getMenuInfo(menu, data_li))
                nophotoType = soup.select('.cont_menu > .list_menu > .nophoto_type')
                for menu in nophotoType:
                        kakao_menu.append(_getMenuInfo(menu, data_li))
                        menuInfos.append(_getMenuInfo(menu, data_li))
                photoType = soup.select('.cont_menu > .list_menu > .photo_type')
                for menu in photoType:
                        kakao_menu.append(_getMenuInfo(menu, data_li))
                        menuInfos.append(_getMenuInfo(menu, data_li))

                for menu_li in menuInfos:
                    print(menu_li)
                    save_menu(menu_li)

            def _getMenuInfo(menu, data_li):
                menu_name = menu.select('.info_menu > .loss_word')[0].text
                menu_name = menu_name.replace("'","")
                menu_prices = menu.select('.info_menu > .price_menu')
                menu_price = ''

                if len(menu_prices) != 0:
                    try:
                        menu_price =  menu_prices[0].text.split(' ')[1]
                        menu_price = int(menu_price.replace(',', '').replace('원', ''))
                    except:
                        menu_price = 'NULL'
                else:
                    menu_price = 'NULL'

                return [data_li[2], menu_name, menu_price]

            def get_details(detail_link):
                time.sleep(10)
                # 매장명
                store_name = driver.find_element_by_css_selector('div.place_details > div > h2').text.replace("'","\\'")
                # 3차 카테고리
                sub_category = driver.find_element_by_css_selector('span.txt_location')
                # 매장고유번호
                store_code = detail_link.split('/')[3]
                # 홈페이지
                try:
                    homepage = driver.find_element_by_css_selector('div.placeinfo_default.placeinfo_homepage a')
                    homepage = homepage.get_attribute('href')
                except:
                    homepage = 'NULL'
                # 별점
                try:
                    rating = float(driver.find_element_by_xpath('//*[@data-target="comment"]/span[1]').text)
                except:
                    rating = 'NULL' # 후기미제공
                # 별점 리뷰 개수
                try:
                    review_count = driver.find_element_by_xpath('//*[@data-target="comment"]/span[2]').text
                    review_count = int(review_count.strip('()'))
                except:
                    review_count = 'NULL'
                # 도로명주소
                address = driver.find_element_by_css_selector('span.txt_address').text.split('(')[0].strip()
                # 지번주소
                try:
                    otheraddress = driver.find_element_by_css_selector('span.txt_addrnum').text.replace('지번','')
                except:
                    otheraddress = 'NULL'
                # 영업시간    
                btn = driver.find_elements_by_xpath('//a[@data-logevent = "main_info,more_timeinfo"]')
                if len(btn) > 0:
                    btn[0].send_keys(Keys.ENTER)
                    opening_hours = driver.find_element_by_css_selector('div.inner_floor').text.replace('\n',' ').replace('닫기','').strip()
                    opening_hours = opening_hours.replace('영업시간', '').replace('휴무일','휴무일:').strip()
                else:
                    try:
                        status = driver.find_element_by_css_selector('div.location_present > strong').text.split(' ')[0]
                        if status == '휴무일':
                            opening_hours = '휴무일 ' + driver.find_element_by_css_selector('ul.list_operation span.txt_operation').text
                        else:
                            opening_hours = ''
                            hours = driver.find_elements_by_css_selector('ul.list_operation span.txt_operation')
                            for hour in hours:
                                opening_hours = opening_hours + hour.text + ' '
                            opening_hours = opening_hours.strip()                        
                    except:
                        opening_hours='NULL'
                # 대표전화번호
                try:
                    telephone = driver.find_element_by_css_selector('span.txt_contact').text
                except:
                    telephone = 'NULL'
                data_li = [store_name, sub_category.text, int(store_code), rating, review_count, address, otheraddress, opening_hours, telephone, homepage, search_word] 
                get_img(data_li)   
                kakao_data.append(data_li)
                get_menu(data_li)


            # 검색어 입력 
            search = driver.find_element_by_css_selector('#search\.keyword\.query')
            search.clear()
            search.send_keys(search_word)
            time.sleep(2)

            # 검색 버튼 누르기
            search_button = driver.find_element_by_css_selector("#search\.keyword\.submit")
            search_button.send_keys(Keys.RETURN)
            time.sleep(2)

            # 검색 개수
            store_count = driver.find_element_by_css_selector("#info\.search\.place\.cnt")
            print('총 검색 수:', store_count.text)

            # 전역 리스트
            kakao_data = []
            kakao_menu = []

            # 장소 더보기 있을때
            try:
                # 장소 더보기 클릭
                more_page = driver.find_element_by_id("info.search.place.more")
                more_page.send_keys(Keys.ENTER)
                time.sleep(2)
            # 장소 더보기 없을때
            except:   
                # 상세보기
                details = driver.find_elements_by_css_selector('div.contact.clickArea > a.moreview')

                for detail in details:
                    detail_link = detail.get_attribute('href')

                    detail.send_keys(Keys.ENTER)

                    # 새 탭 전환
                    driver.switch_to.window(driver.window_handles[1])
                    get_details(detail_link)
                    # 현재 탭 종료
                    driver.close()
                    # 원래 탭으로 전환
                    driver.switch_to.window(driver.window_handles[0]) 
            else:
                # 다음 페이지 >
                next_button = driver.find_element_by_id("info.search.page.next")
                while True:
                    for i in range(1, 6):
                        xPath = '//*[@id="info.search.page.no' + str(i) + '"]'
                        try:
                            page = driver.find_element_by_xpath(xPath)
                            page.send_keys(Keys.ENTER)
                            time.sleep(2)
                            print('=================Page', page.text)
                        except:
                            break

                        # 상세보기
                        details = driver.find_elements_by_css_selector('div.contact.clickArea > a.moreview')
                        for detail in details:
                            detail_link = detail.get_attribute('href')

                            detail.send_keys(Keys.ENTER)

                            # 새 탭 전환
                            driver.switch_to.window(driver.window_handles[1])
                            get_details(detail_link)
                            # 현재 탭 종료
                            driver.close()
                            # 원래 탭으로 전환
                            driver.switch_to.window(driver.window_handles[0])

                    if 'disabled' in next_button.get_attribute("class").split(" "):
                        break;
                    next_button.send_keys(Keys.ENTER)
                    time.sleep(2)

            driver.quit()
            db.commit()
            db.close()
            print('db 저장완료')
            time.sleep(420) # 검색어마다 7분간 sleep
