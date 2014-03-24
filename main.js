(function(window){
	
	function Main(map)
	{
		this.map=map;
		this.url="http://localhost:8081/geoserver/gungorenWS/wms";
		var ilce;
		
		this.addLayer=function(layerName)
		{
			var newLayer = new OpenLayers.Layer.WMS(
                    layerName, "http://localhost:8081/geoserver/gungorenWS/wms",
                    {
                        SERVICE: 'WMS',
                        WIDTH: '451',
                        HEIGHT: '512',
                        LAYERS: layerName,
                        
						format:'image/png',
						transparent: true,
                        //tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
                    },
					{
						singleTile: true,
						visibility:false
					}
                );
			this.map.addLayer(newLayer);
		}
		
		this.checkboxControl=function(id)
		{
			if(id<5)
				if($("#"+id).prop("checked"))
				{
					this.map.layers[id].setVisibility(true);
					this.map.setCenter(this.map.getCenter(),id);
				}
				else
					this.map.layers[id].setVisibility(false);
			else
			{
				try
				{
					if($("#"+id).prop("checked"))
						this.map.layers[id].features[0].style = null;
					else
						this.map.layers[id].features[0].style={ display: 'none' };	
					this.map.layers[id].redraw();
				}
				catch(err){}
			}
			//this.map.layers[id].mergeNewParams({});
		}
		
		this.addLayer("gungorenWS:ilce");
		this.map.setBaseLayer(this.map.getLayersByName("gungorenWS:ilce")[0]);
		this.addLayer("gungorenWS:mahalle");
		this.addLayer("gungorenWS:yol");
		this.addLayer("gungorenWS:yapi");
		this.addLayer("gungorenWS:kapino");
		this.map.getLayersByName("gungorenWS:mahalle")[0].setVisibility(true);
			 
	}
	window.Main=Main;
})(window)