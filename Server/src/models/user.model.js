import { pool } from '../db/config.js';

export const User = {
    // register
    create: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO user (fullname, hostelname, gender, idcard, phonenumber, password, email, roomno) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [data.fullname, data.hostelname, data.gender, data.idcard, data.phonenumber, data.password, data.email,null],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                }
            );
        });
    },
    

    //get user
    getUserByEmail:(email)=>{
        return new Promise((resolve, reject) => {
            pool.query(
                `select * from user where email = ?`,
                [email],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results[0]);
                }
            );
        });
    },

    //update user
    updateUser: (data, email) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE user SET phonenumber = ? WHERE email = ?`,
                [data.phonenumber, email],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                }
            );
        });
    },
    
    // Additional methods can be added here, e.g., find, update, delete, etc.
};
