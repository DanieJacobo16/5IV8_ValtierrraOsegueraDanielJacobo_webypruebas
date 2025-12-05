import sql from '../config/dbcongif.js';

class Product {
4  constructor(product) {
this.name = product.name;
this.price = product.price;
this.description = product.description;
    }

static create(newproduct, result) {
    
    sql.query('INSERT INTO products SET ?', newproduct, (err, res) => {
    });
    if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
    }
