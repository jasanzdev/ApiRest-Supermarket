CREATE EXTENSION IF NOT EXISTS "pgcrypto";

--Create database supermarket_products
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'supermarket_products') THEN
        CREATE DATABASE supermarket_products;
    END IF;
END $$;

-- Create table product
CREATE TABLE IF NOT EXISTS product (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR NOT NULL,
    price DECIMAL(8,2) NOT NULL,
    stock INTEGER NOT NULL,
    threshold INTEGER,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    thumbnail TEXT,
    code BIGINT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Insert test data in product table
INSERT INTO product (name, description, category, price, stock, threshold, code, thumbnail)
VALUES 
    (
        'Essence Mascara Lash Princess',
        'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
        'beauty', 
        9.99, 
        5, 
        1, 
        9164035109868,
        'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png'
    ),
    (
        'Eyeshadow Palette with Mirror',
        'The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it''s convenient for on-the-go makeup application.',
        'beauty', 
        19.99,
        44, 
        1, 
        2817839095220,
        'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png'
    ),
    (
        'Powder Canister',
        'The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.',
        'beauty',
        14.99,
        59,
        5,
        1516267971277,
        'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png'
    ),
    (
        'Red Lipstick',
        'The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.',
        'beauty',
        12.99,
        68,
        1,
        9444582199406,
        'https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png'
    ),
    (
        'Red Nail Polish',
        'The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.',
        'beauty',
        8.99,
        71,
        3,
        3212847902461,
        'https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png'
    ),
    (
        'Calvin Klein CK One',
        'CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It''s a versatile fragrance suitable for everyday wear.',
        'fragrances',
        129.99,
        41,
        1,
        2210136215089,
        'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png'
    ),(
        'Chanel Coco Noir Eau De',
        'Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.',
        'fragrances',
        129.99,
        41,
        1,
        1435582999795,
        'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png'
    ),(
        'Dior J''adore',
        'J''adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.',
        'fragrances',
        89.99,
        91,
        1,
        1887083199279,
        'https://cdn.dummyjson.com/products/images/fragrances/Dior%20J''adore/thumbnail.png'
    ),(
        'Dolce Shine Eau de',
        'Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It''s a joyful and youthful scent.',
        'fragrances',
        69.99,
        3,
        1,
        1939383392674,
        'https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/thumbnail.png'
    ),(
        'Gucci Bloom Eau de',
        'Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It''s a modern and romantic scent.',
        'fragrances',
        79.99,
        93,
        1,
        8232190382069,
        'https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/thumbnail.png'
    ),(
        'Hannibal Colombo Bed',
        'The Hannibal Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.',
        'furniture',
        1899.99,
        47,
        1,
        7113807059215,
        'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png'
    ),(
        'Hannibal Colombo Sofa',
        'The Hannibal Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.',
        'furniture',
        2499.99,
        16,
        1,
        1426785817074,
        'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/thumbnail.png'
    ),(
        'Bedside Table African Cherry',
        'The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.',
        'furniture',
        299.99,
        16,
        1,
        2913244159666,
        'https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/thumbnail.png'
    ),(
        'Knoll Saarinen Executive Conference Chair',
        'The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.',
        'furniture',
        499.99,
        47,
        1,
        1726316339746,
        'https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/thumbnail.png'
    ),(
        'Wooden Bathroom Sink With Mirror',
        'The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink worktop and a matching mirror.',
        'furniture',
        799.99,
        95,
        1,
        7839797529453,
        'https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/thumbnail.png'
    ),(
        'Apple',
        'Fresh and crisp apples, perfect for snacking or incorporating into various recipes.',
        'groceries',
        1.99,
        9,
        1,
        2517819903837,
        'https://cdn.dummyjson.com/products/images/groceries/Apple/thumbnail.png'
    ),(
        'Beef Steak',
        'High-quality beef steak, great for grilling or cooking to your preferred level of doneness.',
        'groceries',
        12.99,
        96,
        1,
        8335515097879,
        'https://cdn.dummyjson.com/products/images/groceries/Beef%20Steak/thumbnail.png'
    ),(
        'Cat Food',
        'Nutritious cat food formulated to meet the dietary needs of your feline friend.',
        'groceries',
        8.99,
        13,
        1,
        5503491330693,
        'https://cdn.dummyjson.com/products/images/groceries/Cat%20Food/thumbnail.png'
    ),(
        'Chicken Meat',
        'Fresh and tender chicken meat, suitable for various culinary preparations.',
        'groceries',
        9.99,
        69,
        1,
        1966223559510,
        'https://cdn.dummyjson.com/products/images/groceries/Chicken%20Meat/thumbnail.png'
    ),(
        'Cooking Oil',
        'Versatile cooking oil suitable for frying, sautéing, and various culinary applications.',
        'groceries',
        4.99,
        22,
        1,
        6707669443381,
        'https://cdn.dummyjson.com/products/images/groceries/Cooking%20Oil/thumbnail.png'
    ),(
        'Cucumber',
        'Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.',
        'groceries',
        1.49,
        22,
        1,
        2597004869708,
        'https://cdn.dummyjson.com/products/images/groceries/Cucumber/thumbnail.png'
    ),(
        'Dog Food',
        'Specially formulated dog food designed to provide essential nutrients for your canine companion.',
        'groceries',
        10.99,
        40,
        1,
        7957222289508,
        'https://cdn.dummyjson.com/products/images/groceries/Dog%20Food/thumbnail.png'
    ),(
        'Eggs',
        'Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.',
        'groceries',
        2.99,
        10,
        1,
        7095702028776,
        'https://cdn.dummyjson.com/products/images/groceries/Eggs/thumbnail.png'
    ),(
        'iPhone 5s',
        'The iPhone 5s is a classic smartphone known for its compact design and advanced features during its release. While it''s an older model, it still provides a reliable user experience.',
        'smartphones',
        199.99,
        65,
        1,
        2903942810911,
        'https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/thumbnail.png'
    ),(
        'iPhone X',
        'The iPhone X is a flagship smartphone featuring a bezel-less OLED display, facial recognition technology (Face ID), and impressive performance. It represents a milestone in iPhone design and innovation.',
        'smartphones',
        899.99,
        99,
        1,
        4331405454760,
        'https://cdn.dummyjson.com/products/images/smartphones/iPhone%20X/thumbnail.png'
    )
ON CONFLICT(code)
DO NOTHING