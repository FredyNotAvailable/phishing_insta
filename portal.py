from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, PlainTextResponse
import psutil
import socket

# net stop http
# python -m uvicorn portal:app --host 0.0.0.0 --port 8080

app = FastAPI()

# ===============================
# Página principal (portal)
# ===============================
@app.get("/", response_class=HTMLResponse)
def portal():
    return """
    <html>
        <head>
            <title>Portal de Bienvenida</title>
        </head>
        <body style="font-family: Arial; text-align:center">
            <h1>Bienvenido a Red-Promo</h1>
            <p>Proyecto académico – Portal cautivo simulado</p>
            <button onclick="window.location.href='https://google.com'">
                Aceptar y continuar
            </button>
        </body>
    </html>
    """

# ===============================
# Endpoints que los SO consultan
# ===============================

# Windows
@app.get("/connecttest.txt")
def windows_check():
    return PlainTextResponse("Microsoft Connect Test")

@app.get("/ncsi.txt")
def windows_ncsi():
    return PlainTextResponse("Microsoft NCSI")

# Apple
@app.get("/hotspot-detect.html", response_class=HTMLResponse)
def apple_check():
    return portal()

# Android
@app.get("/generate_204")
def android_check():
    return portal()

# ===============================
# Detectar clientes conectados
# ===============================
@app.get("/clientes")
def clientes():
    clientes = []
    for c in psutil.net_connections(kind='inet'):
        if c.raddr:
            clientes.append({
                "ip": c.raddr.ip,
                "puerto": c.raddr.port
            })
    return clientes
