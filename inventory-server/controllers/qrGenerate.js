const { default: jsPDF } = require("jspdf");
const QRcode = require('qrcode')
const { exec } = require('child_process');
const path = require('path');

// Path to the pipx environment activation script
const activateScript = process.env.HOME + '/.local/share/pipx/venvs/segno/bin/activate';
const pythonScriptPath = __dirname + '/../qr-micro.py'

function generateMicroQR(data, callback) {
    const command = `source ${activateScript} && python ${pythonScriptPath} "${data}"`;

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                reject(error)
            }

            if (stderr) {
                console.error(`stderr: ${stderr}`);
                // return callback(new Error(stderr));
                reject(new Error(error))
            }

            const base64Image = stdout.trim();
            const dataUrl = `data:image/png;base64,${base64Image}`;
            resolve(dataUrl)
        })
    })
}


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

        const qrSize = 14;

        const margin = 5
        const gap = 0.7

        const fontSize = 12

        let x = margin, y = margin

        doc.setFontSize(fontSize)
        const textH = doc.getTextDimensions('Measure', {
            fontSize: fontSize
        }).h


        const paperWidth = doc.internal.pageSize.getWidth()
        const paperHeight = doc.internal.pageSize.getHeight()

        for (id in idArr) {

            const box = {
                y: y + textH / 2 + gap * 2,
                width: qrSize + gap, //biar agak lebah * 2 lagi karena kanan kiri
                height: qrSize + textH / 2 + gap,
                gap: 4
            }

            const QRContent = `MJSB-${idArr[id]}`

            const currentCenter = x + box.width / 2
            const qrX = currentCenter - qrSize / 2
            const qrY = y + textH + gap 

            const titleY = qrY + textH / 2 - gap * 2
            const titleD = doc.getTextDimensions('MJSB', { fontSize: fontSize })

            const rectTitleX = currentCenter - titleD.w / 2 - 1
            const rectTitleY = titleY - titleD.h
            const rectTitleW = titleD.w + 2

            let idY = qrY + qrSize + textH / 2 + gap
            const idD = doc.getTextDimensions(idArr[id], { fontSize: fontSize })

            let rectIdX = currentCenter - idD.w / 2 - 1
            let rectIdY = idY - idD.h + textH / 2
            let rectIdW = idD.w + 2 

            // const qrCodeDataUrl = await QRcode.toDataURL(
            //     idArr[id], {
            //     margin: 0,
            //     version: 1,
            //     errorCorrectionLevel: 'H',
            // })

            const qrCodeDataUrl = await generateMicroQR(QRContent)
            doc.addImage(qrCodeDataUrl, qrX, qrY, qrSize, qrSize)


            doc.rect(x, box.y, box.width, box.height)

            doc.setFillColor(255, 255, 255); //whiteeeee
            doc.rect(rectTitleX, rectTitleY, rectTitleW, titleD.h, 'F')

            doc.setFont('helvetica', 'bold')
            doc.text('MJSB', currentCenter, titleY, { align: 'center' })

            doc.setFillColor(255, 255, 255); //whiteeeee
            doc.rect(rectIdX, rectIdY, rectIdW, idD.h, 'F')
            doc.text(idArr[id], currentCenter, idY, { align: 'center' })



            if (x + (box.width + box.gap) * 2 < paperWidth) {
                x += box.width + box.gap
                console.log('true')

            } else {
                x = margin
                y += box.height + box.gap * 1.5
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