from flask import Flask, redirect, request, url_for, render_template, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '' #senha
app.config['MYSQL_DB'] = 'desafio3'

mysql = MySQL(app)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/quemsomos")
def quemsomos():
    return render_template("quemsomos.html")

@app.route('/contato', methods=['GET', 'POST'])
def contato():
    if request.method == 'POST':
        email = request.form['email']
        assunto = request.form['assunto']
        descricao = request.form['descricao']
        
        cur = mysql.connection.cursor()
        cur.execute('INSERT INTO contato(email, assunto, descricao) VALUES(%s, %s, %s)', (email, assunto, descricao))
        
        mysql.connection.commit()
        
        cur.close()
        
        return 'Sucesso!'
    return render_template("contato.html")

@app.route('/users')
def users():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM contato")
    users = cur.fetchall()
    cur.close()

    return render_template("users.html", userDetails=users)

@app.route('/edit_user/<int:id>', methods=['GET', 'POST'])
def edit_user(id):
    cur = mysql.connection.cursor()
    
    if request.method == 'POST':
        email = request.form['email']
        assunto = request.form['assunto']
        descricao = request.form['descricao']
        
        cur.execute('UPDATE contato SET email=%s, assunto=%s, descricao=%s WHERE id=%s', (email, assunto, descricao, id))
        mysql.connection.commit()
        
        cur.close()
        return redirect(url_for('users'))

    cur.execute('SELECT * FROM contato WHERE id = %s', (id,))
    user = cur.fetchone()
    cur.close()
    
    return render_template('edit_user.html', user=user)

@app.route('/delete_user/<int:id>', methods=['GET'])
def delete_user(id):
    cur = mysql.connection.cursor()
    cur.execute('DELETE FROM contato WHERE id = %s', (id,))
    mysql.connection.commit()
    cur.close()
    
    return redirect(url_for('users'))
