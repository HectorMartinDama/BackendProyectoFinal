require('dotenv').config()
const app= require('./database/app')
const http= require('http')
const server= http.createServer(app)
const PORT= process.env.PORT || 4000
const handleError= require('./middleware/handleErrors')
// imports Sentry
const Sentry = require('@sentry/node')
const Tracing = require("@sentry/tracing")


Sentry.init({
	dsn: process.env.SENTRY_DSN,
	integrations: [
		new Sentry.Integrations.Http({ tracing: true }),
		new Tracing.Integrations.Express({ app }),
	],
	tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

app.use(handleError)
app.use(Sentry.Handlers.errorHandler())


// Inicia el servidor.
server.listen(PORT, ()=>{
    console.log(`Server running on: http://localhost:${PORT}`)
})




