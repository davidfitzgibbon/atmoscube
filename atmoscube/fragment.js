const fragment = /*glsl*/ `
	varying vec3 vWorldPosition;

  uniform vec3 topColor;
  uniform vec3 bottomColor;
  uniform float offset;
  uniform float exponent;
  uniform vec3 sunColor;
  uniform vec3 sunAngle;
  uniform float sunSizeExponent;
  uniform float sunOpacity;

  void main() {
    vec3 position = normalize(vWorldPosition);

    // SKY
    float height = normalize( vWorldPosition + offset ).y;
    vec4 sky = vec4( mix( bottomColor, topColor, max( pow( max( height, 0.0 ), exponent ), 0.0 ) ), 1.0 );

    // SUN
    float sunStength = (1.0 - distance(sunAngle,position));
    vec3 sun = (sunColor * vec3(pow(sunStength,sunSizeExponent))* vec3(sunOpacity));

    // CLOUDS


    // calculate
    vec3 color = sky.xyz + sun;
    gl_FragColor = vec4(color,1.0);
}
`;
export default fragment;
