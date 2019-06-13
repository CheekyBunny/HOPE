const { loadImage, Canvas } = require('canvas')
const request = require('request-promise')


const SKILL_ID = `64cea988-9e51-4590-b72c-80c38e5ad700`;
//const SKILL_ID = `f8914ca6-5a36-4cdc-9808-a525061d116a`
const OAUTH_TOKEN = `AgAAAAAT7T_HAAT7o7rNdspspkCSg4qZfQZ6I08`;
//const OAUTH_TOKEN = `AgAAAAATzRvNAAT7ozME1uw_TEdwom-xPXB1HS8`



async function generateImage(fio, group, points, maxPoints) {
    const img = await loadImage('./image/template.jpg');

    // Initialiaze a new Canvas with the same dimensions
    // as the image, and get a 2D drawing context for it.
    var canvas = new Canvas(img.width, img.height);
    
    var ctx = canvas.getContext('2d');
    ctx.font = '32px sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.drawImage(img, 0, 0, img.width, img.height);
    ctx.fillText(fio,70,400);
    ctx.fillText(group,70,540);

    ctx.font = '72px sans-serif';
    ctx.fillText(`${points} очков`,700,420);

    let buffer = canvas.toBuffer('image/png');

    let url = `https://dialogs.yandex.net/api/v1/skills/${SKILL_ID}/images`

    try {

        let result = await request.post({
            url,
            headers: {
                'Authorization': `OAuth ${OAUTH_TOKEN}`
            },
            formData: {
                file: {
                    value: buffer,
                    options: {
                        filename: new Date().toString()
                    }
                }
            }
        })

        console.log(result);

        let parsedResult = JSON.parse(result);

        return parsedResult.image.id;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = generateImage;
