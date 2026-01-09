from flask import Flask, request, jsonify, session
from flask_cors import CORS
from datetime import datetime
import json
import os

app = Flask(__name__)
app.secret_key = 'embelsira_secret_key_2024'
CORS(app, supports_credentials=True)

DATA_FILE = 'data/orders.json'
PRODUCTS_FILE = 'data/products.json'

def ensure_data_dir():
    if not os.path.exists('data'):
        os.makedirs('data')

def load_products():
    ensure_data_dir()
    if os.path.exists(PRODUCTS_FILE):
        with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    else:
        products = [
            {
                "id": 1,
                "name": "Torte Çokollatë",
                "description": "Tortë e shijshme me çokollatë belge dhe krem të butë",
                "price": 25,
                "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
                "category": "torta"
            },
            {
                "id": 2,
                "name": "Torte Fruta",
                "description": "Tortë me fruta të freskëta stinore dhe krem vanilje",
                "price": 28,
                "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400",
                "category": "torta"
            },
            {
                "id": 3,
                "name": "Bakllavë",
                "description": "Bakllavë tradicionale me arra dhe mjaltë",
                "price": 8,
                "image": "https://images.unsplash.com/photo-1598110750624-207050c4f28c?w=400",
                "category": "tradicionale"
            },
            {
                "id": 4,
                "name": "Trilece",
                "description": "Trilece kremoz me karamel të freskët",
                "price": 6,
                "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
                "category": "tradicionale"
            },
            {
                "id": 5,
                "name": "Cupcakes",
                "description": "Cupcakes me krem të ndryshëm - 6 copë",
                "price": 12,
                "image": "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400",
                "category": "cupcakes"
            },
            {
                "id": 6,
                "name": "Makaron",
                "description": "Makaron francez me shije të ndryshme - 12 copë",
                "price": 15,
                "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400",
                "category": "biskota"
            },
            {
                "id": 7,
                "name": "Cheesecake",
                "description": "Cheesecake klasik me dredhëza",
                "price": 22,
                "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400",
                "category": "torta"
            },
            {
                "id": 8,
                "name": "Profiterol",
                "description": "Profiterol me krem dhe çokollatë - 8 copë",
                "price": 9,
                "image": "https://images.unsplash.com/photo-1612203985729-70726954388c?w=400",
                "category": "tradicionale"
            }
        ]
        save_products(products)
        return products

def save_products(products):
    ensure_data_dir()
    with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)

def load_orders():
    ensure_data_dir()
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def save_orders(orders):
    ensure_data_dir()
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(orders, f, ensure_ascii=False, indent=2)

@app.route('/api/products', methods=['GET'])
def get_products():
    products = load_products()
    category = request.args.get('category')
    if category and category != 'all':
        products = [p for p in products if p['category'] == category]
    return jsonify(products)

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    products = load_products()
    product = next((p for p in products if p['id'] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({'error': 'Produkti nuk u gjet'}), 404

@app.route('/api/cart', methods=['GET'])
def get_cart():
    cart = session.get('cart', [])
    total = sum(item['price'] * item['quantity'] for item in cart)
    return jsonify({'items': cart, 'total': total})

@app.route('/api/cart/add', methods=['POST'])
def add_to_cart():
    data = request.json
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    
    products = load_products()
    product = next((p for p in products if p['id'] == product_id), None)
    
    if not product:
        return jsonify({'error': 'Produkti nuk u gjet'}), 404
    
    cart = session.get('cart', [])
    existing = next((item for item in cart if item['id'] == product_id), None)
    
    if existing:
        existing['quantity'] += quantity
    else:
        cart.append({
            'id': product['id'],
            'name': product['name'],
            'price': product['price'],
            'image': product['image'],
            'quantity': quantity
        })
    
    session['cart'] = cart
    session.modified = True
    
    return jsonify({'message': f'{product["name"]} u shtua në shportë', 'cart': cart})

@app.route('/api/cart/update', methods=['PUT'])
def update_cart():
    data = request.json
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    
    cart = session.get('cart', [])
    
    for item in cart:
        if item['id'] == product_id:
            if quantity <= 0:
                cart.remove(item)
            else:
                item['quantity'] = quantity
            break
    
    session['cart'] = cart
    session.modified = True
    
    total = sum(item['price'] * item['quantity'] for item in cart)
    return jsonify({'cart': cart, 'total': total})

@app.route('/api/cart/remove/<int:product_id>', methods=['DELETE'])
def remove_from_cart(product_id):
    cart = session.get('cart', [])
    cart = [item for item in cart if item['id'] != product_id]
    session['cart'] = cart
    session.modified = True
    
    total = sum(item['price'] * item['quantity'] for item in cart)
    return jsonify({'message': 'Produkti u hoq', 'cart': cart, 'total': total})

@app.route('/api/cart/clear', methods=['DELETE'])
def clear_cart():
    session['cart'] = []
    session.modified = True
    return jsonify({'message': 'Shporta u zbraz', 'cart': [], 'total': 0})

@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.json
    cart = session.get('cart', [])
    
    if not cart:
        return jsonify({'error': 'Shporta është bosh'}), 400
    
    total = sum(item['price'] * item['quantity'] for item in cart)
    
    order = {
        'id': len(load_orders()) + 1,
        'customer': {
            'name': data.get('name'),
            'email': data.get('email'),
            'phone': data.get('phone'),
            'address': data.get('address')
        },
        'items': cart,
        'total': total,
        'delivery_date': data.get('delivery_date'),
        'notes': data.get('notes', ''),
        'status': 'pending',
        'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    
    orders = load_orders()
    orders.append(order)
    save_orders(orders)
    
    session['cart'] = []
    session.modified = True
    
    return jsonify({'message': 'Porosia u pranua', 'order': order})

@app.route('/api/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    orders = load_orders()
    order = next((o for o in orders if o['id'] == order_id), None)
    if order:
        return jsonify(order)
    return jsonify({'error': 'Porosia nuk u gjet'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
