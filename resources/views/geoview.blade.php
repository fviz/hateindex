@extends('includes.default')

@section('pagetitle')
	GEO
@endsection

@section('content')
<div id="text"></div>
<script>
    var json = $.getJSON("./data/geopreview.json");
    

    

</script>
@endsection