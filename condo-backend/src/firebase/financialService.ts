import { type Response } from 'express'
const {
  addFinancialsToProperty,
  getIdFromToken,
  userExists,
  getCostEntries
} = require('./firebase')
const PDFDocument = require('pdfkit')

const propertyFinancialsAllowedKeys = [
  'feePerSquareFoot',
  'feePerParkingSpot',
  'operationalBudget',
  'operationalBudget',
  'costDescription',
  'costAmount',
  'costEntries',
  'annualReport'
]

const propertyProfileKeysAreValid = (userValues: Object) => {
  const keys = Object.keys(userValues)
  return keys.every((key) => propertyFinancialsAllowedKeys.includes(key))
}

const addPropertyFinancials = async (
  tokenId: string,
  propertyId: string,
  propertyFinancials: Object,
  response: Response
) => {
  const id = await getIdFromToken(tokenId)
  if (!propertyProfileKeysAreValid(propertyFinancials)) {
    response.status(400).send('Invalid property values')
  } else if (await userExists(id)) {
    await addFinancialsToProperty(id, propertyId, propertyFinancials)
    response.status(200).send({
      message: 'property financials updated successfully'
    })
  } else {
    response.status(404).send('User not found')
  }
}

const generateReport = async (
  tokenId: string,
  propertyId: string,
  response: Response
) => {
  const id = await getIdFromToken(tokenId)
  if (await userExists(id)) {
    const costEntries = await getCostEntries(id, propertyId)
    const filename = 'Receipt_test.pdf'
    const doc = new PDFDocument({ bufferPages: true })
    const stream = response.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-disposition': `attachment;filename=${filename}.pdf`
    })
    doc.on('data', (chunk: any) => stream.write(chunk))
    doc.on('end', () => stream.end())
    doc.font('Times-Roman').fontSize(15).text('Financial Report', {
      align: 'center'
    })
    let sum = 0
    costEntries.forEach((entry: any) => {
      doc.font('Times-Roman').fontSize(12).text(`TenantID: ${entry.id}`)
      doc
        .font('Times-Roman')
        .fontSize(12)
        .text(
          `costDescription: ${entry.description}, costAmount: ${entry.amount}`
        )
      sum += parseFloat(entry.amount)
    })
    doc
      .font('Times-Roman')
      .fontSize(12)
      .text(`Total: $${sum.toFixed(2)}`)
    doc.end()
  } else {
    response.status(404).send('User not found')
  }
}
export { addPropertyFinancials, generateReport }
