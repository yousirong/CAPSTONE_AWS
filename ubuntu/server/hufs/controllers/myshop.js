const { error } = require('../utils/index.js');

const controller = {
  async myShop(req, res, next) {
    try {
      const user_no = req.session.user_no;

      const [results] = await res.pool.query(`
        SELECT store_no, store_name, cat_1, cat_2, cat_3, telephone, addr_1, addr_2, addr_3, rb_addr, rating, business_hour, homepage
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
  async deleteAll(req, res, next) {
    try {
      const user_no = req.session.user_no;

      const conn = await res.pool.getConnection();
      try {
        await conn.beginTransaction();
        await conn.query(`
            DELETE FROM user_myshop
            WHERE user_no = ?
          `,
          [user_no]
        )
        await conn.commit();
        next({message: `삭제 되었습니다.`});
        } catch (e) {
          await conn.rollback();
          next(e);
        } finally {
          conn.release();
        }
    } catch (e) {
      next(e);
    }
  },
};

module.exports = controller;
