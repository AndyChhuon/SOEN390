/* eslint @typescript-eslint/prefer-nullish-coalescing: 0 */
const { app } = require('./app')
const PORT = 8080

app.use((err: any, req: any, res: any, next: any) => {
  if (res.headersSent) {
    return next(err)
  }
  console.error(err)
  res.status(500).send('Something went wrong!')
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
