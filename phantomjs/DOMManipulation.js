var phantom = require("phantom");

phantom.create(function (ph) {
	ph.createPage(function (page) {

		var system = require('system');
		var testindex = 0, loadingInProgress = false;

		var Xray = require('x-ray');
		var x = Xray();

		var url = 'xxxxxxx';
		var url2 = 'xxxxxxxxx';

		page.onConsoleMessage = function(msg){
			console.log(msg);
		};

		page.onLoadStarted = function(){
			loadingInProgress = true;
			console.log('------------------------empezando la carga------------------------');
		};

		page.onLoadFinished = function(){
			loadingInProgress = false;

			console.log('------------------------terminando la carga------------------------');
		};

		var steps = [
			function(){
				//cargar pagina
				page.open(url);
			},
			function(){
				//llenar las credenciales
				page.evaluate(function(){
					var frm = document.getElementById("form1");
		    		frm.elements["Login_name"].value = 'Test44';
		    		frm.elements["Login_pass"].value = 'P@$$w0rd1222';
					return;
				});
			},
			function(){
				//login
				page.evaluate(function(){
					document.getElementById("Login_LoginButton").click();
					return;
				});
			},
			function(){
				page.open(url2);
			},
			function(){
				page.evaluate(function(){
					return;
				});
			},
			function(){
				x(url2, 'tr.athing', [{}])  
				  (function(err,data){
				    if(err) {
				      console.log('Error: ' + err);
				    } else {
				      console.log(data);
				    }
				  });
			}

		];

		interval = setInterval(function(){
			if(!loadingInProgress && typeof steps[testindex] == "function"){
				console.log('step' + (testindex+ 1));
				steps[testindex]();
				testindex++;
			}

			if (typeof steps[testindex] != "function") {
				console.log('done');
				phantom.exit();
			};
		}, 500);
	}
}