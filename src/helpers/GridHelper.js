import { LineSegments } from '../objects/LineSegments.js';
import { LineBasicMaterial } from '../materials/LineBasicMaterial.js';
import { Float32BufferAttribute } from '../core/BufferAttribute.js';
import { BufferGeometry } from '../core/BufferGeometry.js';
import { Color } from '../math/Color.js';

class GridHelper extends LineSegments {

	constructor( size = 10, divisions = 10, colorX = 0xff0000, colorY = 0x00ff00, colorSubDivs = 0x999999 ) {

		colorX = new Color( colorX );
		colorY = new Color( colorY );
		colorSubDivs = new Color( colorSubDivs );

		const center = divisions / 2;
		const step = size / divisions;
		const halfSize = size / 2;

		const vertices = [],
			colors = [];

		for ( let i = 0, j = 0, k = - halfSize; i <= divisions; i ++, k += step ) {

			vertices.push( - halfSize, k, 0, halfSize, k, 0 );
			vertices.push( k, - halfSize, 0, k, halfSize, 0 );

			if ( i === center ) {

				colorX.toArray( colors, j );
				j += 3;
				colorX.toArray( colors, j );
				j += 3;
				colorY.toArray( colors, j );
				j += 3;
				colorY.toArray( colors, j );
				j += 3;

			} else {

				colorSubDivs.toArray( colors, j );
				j += 3;
				colorSubDivs.toArray( colors, j );
				j += 3;
				colorSubDivs.toArray( colors, j );
				j += 3;
				colorSubDivs.toArray( colors, j );
				j += 3;

			}

		}

		const geometry = new BufferGeometry();
		geometry.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		geometry.setAttribute( 'color', new Float32BufferAttribute( colors, 3 ) );

		const material = new LineBasicMaterial( {
			vertexColors: true,
			toneMapped: false,
		} );

		super( geometry, material );

		this.type = 'GridHelper';

	}

}

export { GridHelper };
