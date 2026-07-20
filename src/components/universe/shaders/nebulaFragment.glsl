varying vec2 vUv;

uniform float uTime;

float random(vec2 st)
{
    return fract(
        sin(dot(st.xy, vec2(12.9898,78.233)))
        * 43758.5453123
    );
}

float noise(vec2 st)
{
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0,0.0));
    float c = random(i + vec2(0.0,1.0));
    float d = random(i + vec2(1.0,1.0));

    vec2 u = f*f*(3.0-2.0*f);

    return mix(a,b,u.x)
         + (c-a)*u.y*(1.0-u.x)
         + (d-b)*u.x*u.y;
}

float fbm(vec2 st)
{
    float value = 0.0;
    float amplitude = 0.5;

    for(int i=0;i<5;i++)
    {
        value += amplitude * noise(st);

        st *= 2.0;

        amplitude *= 0.5;
    }

    return value;
}

void main()
{
    vec2 uv = vUv;

    uv -= 0.5;

    uv *= 4.0;

    float n =
        fbm(
            uv
            + vec2(
                uTime * 0.02,
                uTime * 0.015
            )
        );

    float radial =
        1.0 -
        smoothstep(
            0.15,
            1.2,
            length(vUv - 0.5)
        );

    float mask =
        radial * n;

    vec3 dark =
        vec3(
            0.01,
            0.03,
            0.08
        );

    vec3 blue =
        vec3(
            0.18,
            0.42,
            0.95
        );

    vec3 white =
        vec3(
            0.85,
            0.92,
            1.0
        );

    vec3 color =
        mix(
            dark,
            blue,
            mask
        );

    color =
        mix(
            color,
            white,
            pow(mask,4.0)*0.25
        );

    gl_FragColor =
        vec4(
            color,
            mask*0.08
        );
}