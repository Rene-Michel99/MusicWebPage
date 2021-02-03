$(document).ready(function ()
{
	$("#submit_btn").click(function()
	{
		var name = document.getElementById("name").value;
		var email = document.getElementById("email").value;
		var pass = document.getElementById("pass").value;
		var conf = document.getElementById("confirm_pass").value;
		if(name != "" && email != "" && pass != "" && conf != ""){
			if (pass == conf){
				var json = {"name":name,"email":email,"passwd":pass};
				//$.post("cadastrar.php",json,function(data,status){});
				console.log(json);
			}
			else
				alert("As senhas informadas não são iguais!");

		}
		else
			alert("Há campos não preenchidos");
	});
});
