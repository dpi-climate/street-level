from flask_cors import CORS
from flask import Flask, request, send_from_directory

import json

from structure import Structure

app = Flask(__name__)
CORS(app)

app.debug  = True

mainPath = '../input/chicago'
grammarpath = f'{mainPath}/grammar.json'

structure = Structure()

@app.route("/", methods=("GET", "POST"))
def init():

    grammar = structure.readGrammar()
    return grammar
    # if("grammar" in request.args):

    # grammarBool = request.args.get('grammar')

    # grammar = {}
    # with open(grammarpath, "r", encoding="utf-8") as f:
    #     grammar = json.load(f)

    # if(grammarBool == "True"): # activate grammar
    #     grammar["grammar"] = True            
    # elif(grammarBool == "False"):
    #     grammar["grammar"] = False

    # with open(grammarpath, "w", encoding="utf-8") as f:
    #     f.write(json.dumps(grammar, indent=4))
    # # print(grammar)
    # return grammar

@app.route("/grammar", methods=("GET", "POST"))
def handleGrammar():

    grammarBool = request.args.get('grammar')

    grammar = {}
    with open(grammarpath, "r", encoding="utf-8") as f:
        grammar = json.load(f)

    if(grammarBool == "True"): # activate grammar
        grammar["grammar"] = True            
    elif(grammarBool == "False"):
        grammar["grammar"] = False

    with open(grammarpath, "w", encoding="utf-8") as f:
        f.write(json.dumps(grammar, indent=4))
        # f.write(grammar)

    return grammar


@app.route("/input", methods=("GET",))
def handleInput():
    fileName = request.args.get("fileName")

    with open(f"{mainPath}/{fileName}", "r", encoding="utf-8") as f:
        input = json.load(f)
    
    return input

@app.route("/updateGrammar", methods=("POST",))
def updateGrammar():
    grammar = json.loads(request.json['grammar'])

    with open(grammarpath, "w", encoding="utf-8") as f:
        f.write(json.dumps(grammar, indent=4, sort_keys=True))

    return ""
