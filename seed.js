require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/productModel')

mongoose.connect(process.env.MONGODB_URI, {})

const seedProducts = [
  {
    name: 'الخزانة المتنقلة',
    description: 'هذه خزانه متنقلة تتميز بسهولة النقل والتجميع.',
    oldPrice: 15000,
    price: 11000,
    image: '/images/product1.jpg',
    features: ['قابلة للنقل', 'متينة', 'سهلة التجميع'],
    colors: ['أحمر', 'أزرق', 'أسود'],
    sizes: ['Petit', 'Moyenne', 'Grand'],
    images: [
      '/images/product1_1.jpg',
      '/images/product1_2.jpg',
      '/images/product1_3.jpg',
    ],
    note: 'الأكثر فائدة',
  },
  {
    name: 'كيس النوم الدافئ للأطفال',
    description: 'كيس نوم مريح ودافئ للأطفال، مناسب للاستخدام في الطقس البارد.',
    oldPrice: 3500,
    price: 2800,
    image: '/images/product3.jpg',
    features: ['دافئ', 'مريح', 'خفيف الوزن'],
    colors: ['وردي', 'أزرق'],
    sizes: [],
    images: [
      '/images/product3_1.jpg',
      '/images/product3_2.jpg',
      '/images/product3_3.jpg',
    ],
    note: 'الأكثر مبيعاً',
  },
  {
    name: 'الباندا المضيئ',
    description: 'باندا مضيئة تضيف لمسة من السحر والغموض إلى الغرفة.',
    oldPrice: 5100,
    price: 4300,
    image: '/images/product2.jpg',
    features: ['إضاءة LED', 'تصميم لطيف'],
    colors: [],
    sizes: [],
    images: [
      '/images/product2_1.jpg',
      '/images/product2_2.jpg',
      '/images/product2_3.jpg',
    ],
    note: 'الأكثر شهرة',
  },
  {
    name: 'الحقيبة القابلة للفصل',
    description: 'حقيبة عملية قابلة للفصل، مثالية للسفر والتنقل.',
    oldPrice: 4000,
    price: 3200,
    image: '/images/product4.jpg',
    features: ['قابلة للفصل', 'مقاومة للماء'],
    colors: ['رمادي', 'أسود'],
    sizes: [], // No sizes for this product
    images: [
      '/images/product4_1.jpg',
      '/images/product4_2.jpg',
      '/images/product4_3.jpg',
    ],
    note: 'الأكثر طلباً',
  },
]

const seedDB = async () => {
  await Product.deleteMany({})
  // Loop through the seed products and use .save() to trigger the pre-save hook
  for (let productData of seedProducts) {
    const product = new Product(productData)
    await product.save() // This will trigger the pre-save hook
  }
  console.log('Database seeded')
  mongoose.connection.close()
}

seedDB()
