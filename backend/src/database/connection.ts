import { Sequelize } from 'sequelize-typescript';
import User from './models/userModel';
import Product from './models/productModel';
import Category from './models/categoryModel';

const sequelize = new Sequelize({
    database: process.env.DB_NAME || 'grocery_store',
    dialect: 'mysql',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    models: [__dirname + '/models'],
});

sequelize.authenticate()
    .then(() => {
        console.log("Database connected");
    })
    .catch((err:any) => {
        console.log("Database Error: " + err);
    });

sequelize.sync({ force: true })
    .then(() => {
        console.log("Database synced");
    });

    ////////////////////// relationship //////////////////////////////////////
    // user and product
    User.hasMany(Product,{foreignKey: 'userId'});
    Product.belongsTo(User,{foreignKey:'userId'});
    // //product and category
    Category.hasOne(Product,{foreignKey: 'categoryId'});
    Product.belongsTo(Category,{foreignKey:'categoryId'});

    // // product cart relation
    // Product.hasMany(Cart,{foreignKey: "productId"});
    // Cart.belongsTo(Product,{foreignKey: "productId"});

    // // cart user relation
    // User.hasMany(Cart,{foreignKey: "userId"});
    // Cart.belongsTo(User,{foreignKey: "userId"});

    // // order and order-detail relation
    // Order.hasMany(OrderDetail,{foreignKey:'orderId'})
    // OrderDetail.belongsTo(Order,{foreignKey:'orderId'})

    // // order-detail and product
    // Product.hasMany(OrderDetail,{foreignKey:'productId'})
    // OrderDetail.belongsTo(Product,{foreignKey:'productId'})

    // //order-payment relation
    // Payment.hasOne(Order,{foreignKey:'paymentId'})
    // Order.belongsTo(Payment,{foreignKey:'paymentId'})

    // // Order-user relation
    // User.hasMany(Order,{foreignKey:'userId'});
    // Order.belongsTo(User,{foreignKey:'userId'});



export default sequelize;