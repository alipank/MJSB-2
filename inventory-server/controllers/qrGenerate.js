const { default: jsPDF } = require("jspdf");
const QRcode = require('qrcode')

exports.generateQr = async (req, res, next) => {
    try {

        const idArr = req.body.id

        if (!Array.isArray(idArr) || idArr.length === 0) {
            throw {
                status: '400',
                message: 'Wrong data value'
            }
        }
    

        const doc = new jsPDF()

        const qrSize = 20;

        doc.setFontSize = 12

        const margin = 5
        const gap = 1

        let x = margin, y = margin


        const textH = doc.getTextDimensions('Measure').h


        const paperWidth = doc.internal.pageSize.getWidth()
        const paperHeight = doc.internal.pageSize.getHeight()

        for (id in idArr) {

            const box = {
                y: y + textH / 2 + gap + gap / 2,
                width: qrSize + gap * 2 * 2, //biar agak lebah * 2 lagi karena kanan kiri
                height: qrSize + textH + gap + gap / 2,
                gap: 4
            }

            const currentCenter = x + box.width / 2
            const qrX = currentCenter - qrSize / 2
            const qrY = y + textH + gap * 2

            const titleY = qrY - gap
            const titleD = doc.getTextDimensions('MJSB')

            const rectTitleX = currentCenter - titleD.w / 2 - gap
            const rectTitleY = titleY - titleD.h
            const rectTitleW = titleD.w + gap * 2

            let idY = qrY + qrSize + textH
            const idD = doc.getTextDimensions(idArr[id])

            let rectIdX = currentCenter - idD.w / 2 - gap
            let rectIdY = idY - idD.h
            let rectIdW = idD.w + gap * 2

            const qrCodeDataUrl = await QRcode.toDataURL(
                idArr[id], {
                margin: 0,
                version: 1,
                errorCorrectionLevel: 'H',
            })

            doc.rect(x, box.y, box.width, box.height)

            doc.setFillColor(255, 255, 255); //whiteeeee
            doc.rect(rectTitleX, rectTitleY, rectTitleW, titleD.h, 'F')

            doc.setFont('helvetica', 'bold')
            doc.text('MJSB', currentCenter, titleY, { align: 'center' })

            doc.addImage(qrCodeDataUrl, qrX, qrY, qrSize, qrSize)

            doc.setFillColor(255, 255, 255); //whiteeeee
            doc.rect(rectIdX, rectIdY, rectIdW, idD.h, 'F')
            doc.text(idArr[id], currentCenter, idY, { align: 'center' })

            if (x + box.width < paperWidth) {
                x += box.width + box.gap
                console.log('true')

            } else {
                console.log('false')
            }
        }

        const pdf = doc.output('arraybuffer')

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="MJSB.pdf"');

        res.send(Buffer.from(pdf))
    } catch (err) {
        console.log(err)
        next(err)
    }
}