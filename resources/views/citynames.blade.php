@extends('includes.default')

@section('pagetitle')
	City Names
@endsection

@section('content')
<div id="text"></div>
<script>
	document.getElementById("text").innerHTML += "Hello!<br>";
	$.getJSON("./data/hatecrimes.json", function(data) {
    	$.each(data, function(i) {
    		$.each(data[i], function(z) {
                var sum = 0;
    			for (var property in this) {
    				if (property == "1st quarter") {
    					sum += this[property];
    				} else if (property == "2nd quarter") {
    					sum += this[property];
                    } else if (property == "3rd quarter") {
                        sum += this[property];
                    } else if (property == "4th quarter") {
                        sum += this[property];
    				}
    			}
                sums.push(sum);
    		});
    	});
    });
</script>
@endsection