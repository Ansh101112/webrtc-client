import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded'
function ZoomSdk() {
    const client = ZoomMtgEmbedded.createClient();
    var authEndpoint = 'http://localhost:4000/'
    var sdkKey = import.meta.env.VITE_CLIENT_ID
    var meetingNumber = '493 046 2975'
    var passWord = 'p0qawf'
    var role = 1
    var userName = 'Rahul Vishwakarma'
    var userEmail = 'rahulvs2809@gmail.com'
    var registrantToken = ''
    var zakToken = ''

    async function getSignature(e) {
        e.preventDefault();
        console.log(authEndpoint);
        await fetch(authEndpoint, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                meetingNumber: meetingNumber,
                role: role
            })
        }).then(async (res) => {
            const data = await res.json();
            console.log(data);
            startMeeting(data.signature);
        }).catch((err) => {
            console.log(err);
        });
        function startMeeting(signature) {
            let meetingSDKElement = document.getElementById('meetingSDKElement');
            client.init({
                zoomAppRoot: meetingSDKElement, language: 'en-US',
                patchJsMedia: true, leaveOnPageUnload: true
            }).then(() => {
                client.join({
                    signature: signature,
                    sdkKey: sdkKey,
                    meetingNumber: meetingNumber,
                    password: passWord,
                    // userName: userName,
                    // userEmail: userEmail,
                    // // tk: registrantToken,
                    // zak: zakToken
                }).then(() => {
                    console.log('joined successfully')
                  }).catch((error) => {
                    console.log(error)
                  })
                }).catch((error) => {
                  console.log(error)
                })
            };
        }
        return (
            <div>
                <div id="meetingSDKElement"> </div>
                <button onClick={getSignature}>Join Meeting</button>
            </div>
        );
    }

    export default ZoomSdk;