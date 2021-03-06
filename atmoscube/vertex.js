const vertex = /*glsl*/ `
	varying vec2 vUv;
	varying vec3 vNormal;
	varying vec3 vWorldPosition;

	void main() {
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		vUv = uv;
		vNormal = normal;

		vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
		vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
	}
`;
export default vertex;
