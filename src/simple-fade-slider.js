function FadeViewer(){
	if (arguments.length == 0) return null;

	if(document.getElementById(arguments[0]) == null) return null;

	var id = 'fadeviewer-'+(new Date()).getTime();

	var args = arguments;

	function createRootContainer(){
		var container = document.createElement('div');
		container.setAttribute('id', id);
		container.setAttribute('class', 'fadeviewer');
		document.getElementById(args[0]).
			parentNode.insertBefore(container, document.getElementById(args[0]).nextSibling);	

	}

	createRootContainer();

	return {};
}
