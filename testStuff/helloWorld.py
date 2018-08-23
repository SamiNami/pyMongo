import bottle

@bottle.route('/hello/<name>')
def index(name):
    return template('<b>Hello {{name}}</b>!', name=name)

@bottle.route('/')
def root():
    return "Kappa ZUppa"

bottle.debug(True)
bottle.run(host='localhost', port=8080)
