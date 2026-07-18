attribute float aScale;

uniform float uTime;

varying vec3 vColor;

void main() {

    vColor = color;

    vec4 modelPosition = modelMatrix * vec4(position,1.0);

    float angle = atan(modelPosition.x, modelPosition.z);

    float distanceToCenter = length(modelPosition.xz);

    angle += uTime * 0.02 / (distanceToCenter + 1.0);

    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    gl_PointSize = aScale * 6.0;
    gl_PointSize *= (1.0 / -viewPosition.z);
}