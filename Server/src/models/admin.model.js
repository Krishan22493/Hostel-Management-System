import { pool } from '../db/config.js';

export const Admin = {
    // register
    create: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO admin (fullname, hostelname, gender, phonenumber, password, email) VALUES (?, ?, ?, ?, ?, ?)`,
                [data.fullname, data.hostelname, data.gender, data.phonenumber, data.password, data.email],
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
    getUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `select * from admin where email = ?`,
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
                `UPDATE admin SET hostelname = ?, phonenumber = ? WHERE email = ?`,
                [data.hostelname, data.phonenumber, email],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                }
            );
        });
    },

    //get all users
    getAllUsersByHostel: (hostelname) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * FROM user WHERE hostelname = ?`,
                [hostelname],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                }
            );
        });
    },

    allotRoom: (email, roomNo) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) return reject(err);

                connection.beginTransaction((err) => {
                    if (err) {
                        connection.release();
                        return reject(err);
                    }

                    // Check if the user exists
                    connection.query(
                        `SELECT * FROM user WHERE email = ?`,
                        [email],
                        (error, results) => {
                            if (error) {
                                connection.rollback(() => {
                                    connection.release();
                                    return reject(error);
                                });
                            }

                            if (results.length === 0) {
                                connection.rollback(() => {
                                    connection.release();
                                    return reject(new Error('User not found'));
                                });
                            }

                            // Update the user table
                            connection.query(
                                `UPDATE user SET roomno = ? WHERE email = ?`,
                                [roomNo, email],
                                (error, updateResults) => {
                                    if (error) {
                                        connection.rollback(() => {
                                            connection.release();
                                            return reject(error);
                                        });
                                    }

                                    // Update the room table
                                    connection.query(
                                        `UPDATE room SET email = ? WHERE roomno = ?`,
                                        [email, roomNo],
                                        (error, roomUpdateResults) => {
                                            if (error) {
                                                connection.rollback(() => {
                                                    connection.release();
                                                    return reject(error);
                                                });
                                            }

                                            // Commit the transaction
                                            connection.commit((err) => {
                                                if (err) {
                                                    connection.rollback(() => {
                                                        connection.release();
                                                        return reject(err);
                                                    });
                                                }

                                                connection.release();
                                                resolve({
                                                    userUpdate: updateResults,
                                                    roomUpdate: roomUpdateResults
                                                });
                                            });
                                        }
                                    );
                                }
                            );
                        }
                    );
                });
            });
        });
    },

    usersRoomPending: (hostelname) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * FROM user WHERE hostelname = ? AND roomno IS NULL`,
                [hostelname],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                }
            );
        });
    },

    vacantRoom: (hostelname) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT roomno FROM room WHERE hostel = ? AND email IS NULL`,
                [hostelname],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                }
            );
        });
    },

    occupiedRoom: (hostelname) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT roomno FROM room WHERE hostel = ? AND email IS NOT NULL;`,
                [hostelname],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                }
            );
        });
    }







    // Additional methods can be added here, e.g., find, update, delete, etc.
};
