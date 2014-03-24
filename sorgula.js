(function(window){
	
	function sorgula()
	{
	var ths=this;
		this.addmahalle=function()
		{
			//Mahalleler selecte getirilir
			$.post('php/getMahalle.php',{},
			function(donenveri)
			{	
				
				var selectElement = document.getElementById ("mahalle");
				
				var a=1;
				for(var i in donenveri)
				{
					   option = new Option (donenveri[i].mahalle,donenveri[i].geom);
					   selectElement.options[a++] = option;	
				}
				selectElement.onchange=function()
				{
					/*if($("#mahalle option:selected").text() == "Lütfen Mahalle Seçiniz")
						$("#kapino").empty();
						$("#sokak").empty();*/
						try{
							ths.addSokak(selectElement);
						}
						catch(e){
							var selectElement2 = document.getElementById ("kapino");
							$("#kapino").empty();
							option = new Option ("Lütfen Kapı No Seçiniz",0);
							selectElement2.options[0] = option;
							
							selectElement2 = document.getElementById ("sokak");
							$("#sokak").empty();
							option = new Option ("Lütfen Sokak Seçiniz",0);
							selectElement2.options[0] = option;
						}
				}
			},
			'json');
				
		}
		this.addSokak = function(selectElement)
		{
			//Bu fonksiyon mahalle vektörünü çizer sokak select'ini doldurur
			sokLayer.removeFeatures(sokLayer.features[0]);
			kapLayer.removeFeatures(kapLayer.features[0]);
			$("#5").prop('checked', true);
			this.deserialize(selectElement.value,mahLayer);
			
			$.post('php/getSokak.php',{"mahalle":$( "#mahalle option:selected" ).text()},
			function(donenveri)
			{	
				var selectElement2 = document.getElementById ("kapino");
				$("#kapino").empty();
				option = new Option ("Lütfen Kapı No Seçiniz",0);
				selectElement2.options[0] = option;
				
				selectElement2 = document.getElementById ("sokak");
				$("#sokak").empty();
				option = new Option ("Lütfen Sokak Seçiniz",0);
				selectElement2.options[0] = option;
				var a=1;
				for(var i in donenveri)
				{
					   option = new Option (donenveri[i].yol_ismi,donenveri[i].geom);
					   selectElement2.options[a++] = option;
				}
				selectElement2.onchange=function()
				{
					try{
							ths.addKapino(selectElement2);
					}
					catch(e)
					{
						selectElement2 = document.getElementById ("kapino");
						$("#kapino").empty();
						option = new Option ("Lütfen Kapı No Seçiniz",0);
						selectElement2.options[0] = option;
					}
				}
			},
			'json');
	
		}
		
		this.addKapino=function(selectElement2)
		{
			kapLayer.removeFeatures(kapLayer.features[0]);
			$("#6").prop('checked', true);
			this.deserialize(selectElement2.value,sokLayer);
			$.post('php/getKapino.php',{"mahalle":$( "#mahalle option:selected" ).text(),
										"sokak":$( "#sokak option:selected" ).text()
			},
			function(donenveri)
			{	
				var selectElement3 = document.getElementById ("kapino");
				$("#kapino").empty();
				option = new Option ("Lütfen Kapı No Seçiniz",0);
				selectElement3.options[0] = option;
				var a=1;
				for(var i in donenveri)
				{
					   option = new Option (donenveri[i].kapi_no,donenveri[i].geom);
					   selectElement3.options[a++] = option;	
				}
				selectElement3.onchange=function()
				{
					$("#7").prop('checked', true);
					try{
						ths.deserialize(selectElement3.value,kapLayer);
					}
					catch(e){
					}
				}
			},
			'json');
		}
		this.updateFormat = function()
		{
			
			var in_options = {
				'internalProjection': map.baseLayer.projection
			};   
			var out_options = {
				'internalProjection': map.baseLayer.projection
			};
			
			formats = {
				'in': 
				{
					wkt: new OpenLayers.Format.WKT(in_options),
					encoded_polyline: new OpenLayers.Format.EncodedPolyline(in_options)
				},
				
				'out': 
				{
					wkt: new OpenLayers.Format.WKT(out_options),
					encoded_polyline: new OpenLayers.Format.EncodedPolyline(out_options)
				}
			};
			
		}
		
		this.deserialize = function(_geom,layer)
		{
		   var features = formats['in']['wkt'].read(_geom);
			var bounds;
			
            if(features)
			{
                if(features.constructor != Array)
                    features = [features];
                for(var i=0; i<features.length; ++i)
                    if (!bounds)
                        bounds = features[i].geometry.getBounds();
                    else
                        bounds.extend(features[i].geometry.getBounds());
				}
				
			//Bir öncesini silme	
			  layer.removeFeatures(layer.features[0]);
     	      layer.addFeatures(features); 
              map.zoomToExtent(bounds);
		} 
	}
	
	window.sorgula = sorgula;
	
	})(window)
	
	