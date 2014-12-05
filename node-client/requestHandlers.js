var exec = require("child_process").exec;

function kill_browser(query, response) 
{
    console.log("Request handler 'kill_browser' was called.");

    // find a way to do this from the host system rather than the VM????
    var browser_names = [
        'iexplore.exe',
        'chrome.exe',
        'firefox.exe'
    ]
    
    for (var i = 0; i < browser_names.length; i++) {
        var value = browser_names[i];
        exec ('taskkill /IM '+ value,
            function (error, stdout, stderr) 
            {
                response.writeHead(200, {"Content-Type": "text/plain"}); 

                if (! error) {
                    response.write('Killed : ' + value);
                }
                else {
                    response.write('Error : ' + error);
                }
                response.end();
            }
        );
    }
}

function enslave_browser(query, response) 
{
    console.log("Request handler 'enslave_browser' was called for server: " + query);

    // find a way to do this from the host system rather than the VM????
    var browser_paths = [
        '"C:\\Program Files\\Internet Explorer\\iexplore.exe"',
        '"C:\\Program Files\\Mozilla Firefox\\firefox.exe"',
        '"C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe"'
    ]
    
    for (var i = 0; i < browser_paths.length; i++) {
        var value = browser_paths[i];
        exec (browser_paths[i] + " http://" + query + '/capture',
            function (error, stdout, stderr) 
            {
                response.writeHead(200, {"Content-Type": "text/plain"}); 

                if (! error) {
                    response.write('Opened : ' + value);
                }
                else {
                    response.write('Error : ' + error);
                }

                response.end();
            }
        );
    }
}

exports.kill_browser = kill_browser;
exports.enslave_browser = enslave_browser;
