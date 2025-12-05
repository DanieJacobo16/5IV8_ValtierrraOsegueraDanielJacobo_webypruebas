
import { parse } from 'path';
import product from '../modelos/productmodel.js';

export const create = (req, res) => {
    let categoryid = req.body.categoryid;
    if (!req.name + || (¡isNaN(parseInt (categoryid)) && categoryid===0)) {; 
