const { MediaUpload, MediaPlaceholder, BlockControls, InspectorControls } = wp.editor;
const { registerBlockType } = wp.blocks;
const { IconButton, RangeControl, ToggleControl } = wp.components;
const { __ } = wp.i18n;

import './style.scss';
import './editor.scss';

registerBlockType('ay/gallery', {   
	title: __( 'AY Gallery', 'ay' ),
	description: __( 'Only for nice images 😍', 'ay' ),
	icon: 'format-gallery',
	category: 'common',
	supports: {
    	align: ['full']
	},
	attributes: {				
		images: {
        	type: 'array',
    	},
    	columns: {
	    	type: 'number',
			default: '1',
    	},
    	fancy: {
			default: false,
		},
		fancyClass: {
			type: 'string',
			default: '',
		},
    },
		
	edit({ attributes, className, setAttributes }) {
		
		const { images = [] } = attributes;
		const imagesParsed = images.map( ( image ) => JSON.parse( image ) );
		const { columns } = attributes;
		const { fancy } = attributes;
		const { fancyClass } = attributes;
				
		const displayImages = (images) => {
            return (
                imagesParsed.map( (image) => {
                    return (
                    	<figure className="ay-gallery__item">
                    		<img className='ay-gallery__item-img' src={ image.url } key={ image.id } />                  		
                    	</figure>
                    )
                })
            )
        }
        
        function updateImages( media ) {
    	    setAttributes({
    	        images: media.map( ( image ) => JSON.stringify({ id: image.id, url: image.url, alt: image.alt }) )
    	    });
    	}   
    	
    	function onChangeColumn( columns ) {
    	    setAttributes({
    	        columns: columns
    	    });
    	}  
    	
    	function needFancy( fancy ) {
    	    setAttributes({
    	        fancy: fancy
    	    });
    	}   
    	
    	if ( true === fancy ) {    	
    		setAttributes({
    			fancyClass: ' fancy'
    		});   	    	
    	}
    	else {
	    	setAttributes({
    	        fancyClass: ''
    	    }); 
    	}

    	if ( 0 === images.length ) {
        	return (
        	    <div>
        	        <MediaPlaceholder
        	            icon = "format-gallery"
        	            className = { className }
        	            onSelect = { updateImages }
        	            accept = "image/*"
        	            allowedTypes = { [ 'image' ] }
        	            multiple
        	        />
        	    </div>
        	);
		}
        
        return (
            
            <div>
            	<InspectorControls>
	        		<RangeControl
	        		 	label = { __( 'Columns', 'ay' ) }
	        		 	value = { columns }
	        		 	initialPosition = { columns }
	        		 	onChange = { onChangeColumn }
	        			min = { 1 }
	        			max = { 3 }
	        			className = { 'components-panel__body is-opened' }
	        		/>
	        		<ToggleControl
	        			label = { __( 'Fancybox', 'ay' ) }
	        			checked = { fancy }
	        			onChange = { needFancy }
	        		/>
	        	</InspectorControls>
            	<BlockControls>
            		{ !! images.length && (
            			<div className="components-toolbar">                               	               
                			<MediaUpload                	
                				type = "image"
                				multiple
                				gallery
                				value = { imagesParsed.map( ( image ) => image.id ) }
                				onSelect = { updateImages }
                				render = {({open}) => (
                				    <IconButton className='components-icon-button components-toolbar__control' icon="edit" onClick={open}></IconButton>
								)}
                			/>                             	
						</div>
					) }
                </BlockControls> 
                <div className = { "ay-gallery col-" +  columns + fancyClass }>
                    { displayImages(images) } 
                </div> 
            </div>
        );
    	
  	},

  	save({ attributes }) {
    	
    	const { images = [] } = attributes;
		const imagesParsed = images.map( ( image ) => JSON.parse( image ) );
		const { columns } = attributes;
		const { fancy } = attributes;
		const { fancyClass } = attributes;
									
		const displayImages = (images) => {
            return (
                imagesParsed.map( (image) => {
                    return (
                    	<div className="ay-gallery__item">
                    		<img className='ay-gallery__item-img' src={image.url} key={ image.id } />                  		
                    	</div>
                    )
                })
            )
        }

		return (
		    <div>
		    	<div className={ "ay-gallery col-" +  columns + fancyClass }>
		    		{ displayImages(images) }
		    	</div>
		    </div>
		);

	},	

});