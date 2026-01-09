from flask import Flask, render_template, request, redirect, url_for, flash, session
from datetime import datetime
import json
import os

app = Flask(__name__)
app.secret_key = 'embelsira_secret_key_2024'

# Database simuluar me JSON
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
        # Produktet fillestare
        products = [
            {
                "id": 1,
                "name": "Torte Çokollatë",
                "description": "Tortë e shijshme me çokollatë belge dhe krem të butë",
                "price": 2500,
                "image": "chocolate_cake.jpg",
                "category": "torta"
            },
            {
                "id": 2,
                "name": "Torte Fruta",
                "description": "Tortë me fruta të freskëta stinore dhe krem vanilje",
                "price": 2800,
                "image": "fruit_cake.jpg",
                "category": "torta"
            },
            {
                "id": 3,
                "name": "Bakllavë",
                "description": "Bakllavë tradicionale me arra dhe mjaltë",
                "price": 800,
                "image": "baklava.jpg",
                "category": "embelsira_tradicionale"
            },
            {
                "id": 4,
                "name": "Trilece",
                "description": "Trilece kremoz me karamel të freskët",
                "price": 600,
                "image": "trilece.jpg",
                "category": "embelsira_tradicionale"
            },
            {
                "id": 5,
                "name": "Cupcakes",
                "description": "Cupcakes me krem të ndryshëm - 6 copë",
                "price": 1200,
                "image": "cupcakes.jpg",
                "category": "cupcakes"
            },
            {
                "id": 6,
                "name": "Makaron",
                "description": "Makaron francez me shije të ndryshme - 12 copë",
                "price": 1500,
                "image": "macarons.jpg",
                "category": "biskota"
            },
            {
                "id": 7,
                "name": "Cheesecake",
                "description": "Cheesecake klasik me dredhëza",
                "price": 2200,
                "image": "cheesecake.jpg",
                "category": "torta"
            },
            {
                "id": 8,
                "name": "Profiterol",
                "description": "Profiterol me krem dhe çokollatë - 8 copë",
                "price": 900,
                "image": "profiteroles.jpg",
                "category": "embelsira_tradicionale"
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

def get_cart():
    if 'cart' not in session:
        session['cart'] = []
    return session['cart']

@app.route('/')
def index():
    products = load_products()
    featured = products[:4]
    return render_template('index.html', featured_products=featured)

@app.route('/products')
def products():
    all_products = load_products()
    category = request.args.get('category', 'all')
    if category != 'all':
        all_products = [p for p in all_products if p['category'] == category]
    return render_template('products.html', products=all_products, category=category)

@app.route('/product/<int:product_id>')
def product_detail(product_id):
    products = load_products()
    product = next((p for p in products if p['id'] == product_id), None)
    if product:
        return render_template('product_detail.html', product=product)
    flash('Produkti nuk u gjet!', 'error')
    return redirect(url_for('products'))

@app.route('/add_to_cart/<int:product_id>', methods=['POST'])
def add_to_cart(product_id):
    products = load_products()
    product = next((p for p in products if p['id'] == product_id), None)
    if product:
        cart = get_cart()
        # Kontrollo nëse produkti është tashmë në shportë
        existing = next((item for item in cart if item['id'] == product_id), None)
        if existing:
            existing['quantity'] += int(request.form.get('quantity', 1))
        else:
            cart.append({
                'id': product['id'],
                'name': product['name'],
                'price': product['price'],
                'quantity': int(request.form.get('quantity', 1))
            })
        session['cart'] = cart
        session.modified = True
        flash(f'{product["name"]} u shtua në shportë!', 'success')
    return redirect(url_for('cart'))

@app.route('/cart')
def cart():
    cart_items = get_cart()
    total = sum(item['price'] * item['quantity'] for item in cart_items)
    return render_template('cart.html', cart=cart_items, total=total)

@app.route('/update_cart/<int:product_id>', methods=['POST'])
def update_cart(product_id):
    cart = get_cart()
    quantity = int(request.form.get('quantity', 1))
    for item in cart:
        if item['id'] == product_id:
            if quantity <= 0:
                cart.remove(item)
            else:
                item['quantity'] = quantity
            break
    session['cart'] = cart
    session.modified = True
    return redirect(url_for('cart'))

@app.route('/remove_from_cart/<int:product_id>')
def remove_from_cart(product_id):
    cart = get_cart()
    cart = [item for item in cart if item['id'] != product_id]
    session['cart'] = cart
    session.modified = True
    flash('Produkti u hoq nga shporta!', 'info')
    return redirect(url_for('cart'))

@app.route('/checkout', methods=['GET', 'POST'])
def checkout():
    cart_items = get_cart()
    if not cart_items:
        flash('Shporta juaj është bosh!', 'warning')
        return redirect(url_for('products'))
    
    total = sum(item['price'] * item['quantity'] for item in cart_items)
    
    if request.method == 'POST':
        order = {
            'id': len(load_orders()) + 1,
            'customer': {
                'name': request.form['name'],
                'email': request.form['email'],
                'phone': request.form['phone'],
                'address': request.form['address']
            },
            'items': cart_items,
            'total': total,
            'delivery_date': request.form['delivery_date'],
            'notes': request.form.get('notes', ''),
            'status': 'pending',
            'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
        orders = load_orders()
        orders.append(order)
        save_orders(orders)
        
        session['cart'] = []
        session.modified = True
        
        flash('Porosia juaj u pranua me sukses! Do të kontaktoheni së shpejti.', 'success')
        return redirect(url_for('order_confirmation', order_id=order['id']))
    
    return render_template('checkout.html', cart=cart_items, total=total)

@app.route('/order_confirmation/<int:order_id>')
def order_confirmation(order_id):
    orders = load_orders()
    order = next((o for o in orders if o['id'] == order_id), None)
    if order:
        return render_template('order_confirmation.html', order=order)
    return redirect(url_for('index'))

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        flash('Mesazhi juaj u dërgua me sukses! Do t\'ju kontaktojmë së shpejti.', 'success')
        return redirect(url_for('contact'))
    return render_template('contact.html')

@app.context_processor
def cart_count():
    cart = get_cart()
    count = sum(item['quantity'] for item in cart)
    return dict(cart_count=count)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
