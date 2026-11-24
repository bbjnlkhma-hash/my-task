from flask import Flask, render_template, request

app = Flask(__name__)
messages = []


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        if name:
            messages.append(name)
    return render_template("index.html", messages=messages)


@app.route("/clear", methods=["POST"])
def clear():
    messages.clear()
    return render_template("index.html", messages=messages)


if __name__ == "__main__":
    app.run(debug=True)
