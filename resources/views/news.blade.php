@extends('includes.default')

@section('pagetitle')
	City Names
@endsection

@section('content')
<div id="text"></div>
<script>
	document.getElementById("text").innerHTML += "Hello!<br>";
	$.getJSON("./data/news.json", function(data) {
    	$.each(data, function() {
            var city;
            var state;
            var date;
			for (var property in this) {
				if (property == "Article Date") {
                    date = this[property];
                } if (property == "City") {
                    if (this[property])
                       city = this[property];
				} else if (property == "State") {
                    if (this[property])
					   state = this[property];
                }
			}
            if (city != undefined)
                console.log(city + " " + state);
    	});
    });
</script>
@endsection