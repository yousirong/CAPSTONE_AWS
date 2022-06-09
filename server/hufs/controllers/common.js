const { env } = require("../config");
const { name, version } = require("../package");
const { error } = require('../utils/index.js');

const controller = {
  async ping(req, res, next) {
    try {
      const [results] = await res.pool.query(`
            SELECT * FROM users WHERE enabled = 1;
        `);
      res.json({
        env,
        name,
        version,
      });
    } catch (e) {
      next(e);
    }
  },
  async login(req, res, next) {
    try {
      if (req.session.is_logined) throw error(`로그인 되었습니다`);
      const email = req.body.email;
      const password = req.body.password;

      const [results] = await res.pool.query(
        `
            SELECT user_no, first_name, last_name
            FROM users
            WHERE enabled = 1
            AND email = ?
            AND password = PASSWORD(?);
        `,
        [email, password]
      );
      if (results.length < 1) {
        throw error(`이메일 또는 비밀번호가 일치하지 않습니다`)
      } else {
        const user_no = results[0].user_no;
        const first_name = results[0].first_name;
        const last_name = results[0].last_name;
        const message = `로그인 되었습니다.`
        req.session.is_logined = true;
        req.session.user_no = user_no;
        next({user_no, first_name, last_name, message});
      }
    } catch (e) {
      next(e);
    }
  },
  async logout(req, res, next) {
    try {
      if (!req.session.is_logined) throw error(`잘못된 요청입니다.`);
      await req.session.destroy(function(e){
      });
      next({ message: `로그아웃 되었습니다.` });
    } catch (e) {
      next(e);
    }
  },
  async register(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const phone = req.body.phone;
      const last_name = req.body.last_name;
      const first_name = req.body.first_name;
      const [result] = await res.pool.query(
        `
          SELECT
          COUNT(*) AS 'count'
          FROM users
          WHERE enabled=1
          AND email = ?;
      `,
        [email]
      );
      if (result[0].count > 0) throw error(`이미 존재하는 아이디입니다.`);
      else {
        const conn = await res.pool.getConnection(async (conn) => conn);
        try {
          await conn.beginTransaction();
          await conn.query(`
              INSERT INTO users(email, password, phone, first_name, last_name)
              VALUES (?,PASSWORD(?),?,?,?);
            `,
            [email, password, phone, first_name, last_name]
          );
          await conn.commit();
          next({ message: `회원가입 완료` })
        } catch (e) {
          await conn.rollback();
          next(e);
        } finally {
          conn.release();
        }
      }
    } catch (e) {
      next(e);
    }
  },
  async detail(req, res, next) {
    try {
      const store_no = req.body.store_no;

      const [results] = await res.pool.query(`
          SELECT store_name, cat_1, cat_2, cat_3, telephone, addr_1, addr_2, addr_3, rb_addr, rating, business_hour, homepage, review_count, img_url1, img_url2, img_url3
          FROM business_data
          WHERE store_no=?;

          SELECT COUNT(*) AS 'count'
          FROM user_myshop
          WHERE store_no = ?
          AND status = 1;

          SELECT COUNT(*) AS 'count'
          FROM user_myshop
          WHERE store_no = ?
          AND status = 2;
        `,
        [store_no, store_no, store_no]
      );
      next({ results });
    } catch (e) {
      next(e);
    }
  },
  async user(req, res, next) {
    try {
      const user_no = req.session.user_no
      if(user_no) {
      const [results] = await res.pool.query(`
            SELECT email, phone, first_name, last_name, roll
            FROM users
            WHERE enabled = 1
            and user_no = ?;
        `,
        [user_no]
        );
      const email = results[0].email;
      const phone = results[0].phone;
      const first_name = results[0].first_name;
      const last_name = results[0].last_name;
      const roll = results[0].roll;
      next({ email, phone, first_name, last_name, roll });
      } else {
        throw error(`먼저 로그인 해주세요.`)
      }
    } catch (e) {
      next(e);
    }
  },/*
  async dashboard(req, res, next) {
    try {
      const [results] = await res.pool.query(`
          SELECT *
          FROM business_data
          limit 100
        `
      );
      next({ results });
    } catch (e) {
      next(e);
    }
  },
  async queryList(req, res, next) {
    try {
      const cat_1 = req.body.cat_1;
      const cat_2 = req.body.cat_2;
      const cat_3 = req.body.cat_3;
      const addr_1 = req.body.addr_1;
      const addr_2 = req.body.addr_2;
      const addr_3 = req.body.addr_3;

      const [results] = await res.pool.query(`
          SELECT * FROM Business_data
          WHERE cat_1 = ?
          AND cat_2 = ?
          AND cat_3 = ?
          AND addr_1 = ?
          AND addr_2 = ?
          AND addr_3 = ?;
        `,
        [cat_1, cat_2, cat_3, addr_1, addr_2, addr_3]
      );
      next({ results });
    } catch (e) {
      next(e);
    }
  },
  async myShop(req, res, next) {
    try {
      const user_no = req.session.user_no;

      const [results] = await res.pool.query(`
        SELECT *
        FROM business_data b
        join ( SELECT store_no FROM user_myshop WHERE user_no=?) u
        ON u.store_no=b.store_no
        `,
        [user_no]
      );
      next({ results });
    } catch (e) {
      next(e);
    }
  },
  async collectStore(req, res, next) {
    try {
      const user_no = req.session.user_no;
      const store_no = req.body.store_no;
      console.log(user_no);

      const conn = await res.pool.getConnection();
      try {
        await conn.beginTransaction();
        await conn.query(`
            INSERT INTO user_myshop (user_no, store_no)
            VALUES (?,?)
          `,
          [user_no, store_no]
        );
        await conn.commit();
        next({ message: `성공적으로 수집되었습니다.`});
      } catch (e) {
        await conn.rollback();// 롤백
        next(e);
      } finally {
        conn.release();
      }
    } catch (e) {
      next(e);
    }
  },
  async businessProgress(req, res, next) {
    try {
      const status = req.body.status;
      const user_no = req.session.user_no;
      const store_no = req.body.store_no;

      const conn = await res.pool.getConnection();
      try {
        await conn.beginTransaction();
        await conn.query(`
            UPDATE user_myshop
            SET status = ?
            WHERE user_no = ? AND store_no = ?
          `,
          [status, user_no, store_no]
        )
        await conn.commit();
        next({message: `수정 되었습니다.`});
        } catch (e) {
          await conn.rollback();// 롤백
          next(e);
        } finally {
          conn.release();
        }
    } catch (e) {
      next(e);
    }
  },
  async deleteCollection(req, res, next) {
    try {
      const user_no = req.session.user_no;
      const store_no = req.body.store_no;

      const conn = await res.pool.getConnection();
      try {
        await conn.beginTransaction();
        await conn.query(`
            DELETE FROM user_myshop
            WHERE user_no = ? AND store_no = ?
          `,
          [user_no, store_no]
        )
        await conn.commit();
        next({message: `삭제 되었습니다.`});
        } catch (e) {
          await conn.rollback();// 롤백
          next(e);
        } finally {
          conn.release();
        }
    } catch (e) {
      next(e);
    }
  },
  */
};

module.exports = controller;
