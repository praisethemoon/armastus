import { GradientColor } from "./Color";

export class ShaderFactory {
    private static linearFragmentShader = (gradient: GradientColor) => `
        int numColorStops = ${gradient.colorStops.length};
        extern vec4 colorStops[${gradient.colorStops.length}];
        extern float colorPositions[${gradient.colorStops.length}];
        float angle = ${gradient.angle}; // Added angle parameter

        vec4 effect(vec4 color, Image texture, vec2 texture_coords, vec2 screen_coords) {
            // Calculate the position along the gradient axis based on the angle
            vec2 gradientDirection = vec2(cos(angle), sin(angle));
            float position = dot(texture_coords - vec2(0.5, 0.5), gradientDirection) + 0.5;
    
            // Initialize the interpolated color
            vec4 interpolatedColor = vec4(0.0);
    
            // Find the two color stops to interpolate between
            int startIndex = 0;
            int endIndex = 0;
    
            for (int i = 0; i < ${gradient.colorStops.length} - 1; i++) {
                if (position >= colorPositions[i] && position <= colorPositions[i + 1]) {
                    startIndex = i;
                    endIndex = i + 1;
                    break;
                }
            }
    
            // Calculate the t value for interpolation
            float t = (position - colorPositions[startIndex]) / (colorPositions[endIndex] - colorPositions[startIndex]);
    
            // Interpolate between the two colors using the t value
            vec4 startColor = colorStops[startIndex];
            vec4 endColor = colorStops[endIndex];
            interpolatedColor = mix(startColor, endColor, t);
    
            return interpolatedColor * color;
        }
    `;

    private static conicalFragmentShader = (gradient: GradientColor) => `
        int numColorStops = ${gradient.colorStops.length};
        extern vec4 colorStops[${gradient.colorStops.length}];
        extern float colorPositions[${gradient.colorStops.length}];
        float angle = ${gradient.angle}; // Angle in radians
        
        vec4 effect(vec4 color, Image texture, vec2 texture_coords, vec2 screen_coords) {
            // Calculate the direction vector from the center to the current pixel
            vec2 center = love_ScreenSize.xy / 2.0;
            vec2 dir = normalize(screen_coords - center);
            
            // Calculate the angle between the gradient direction and the pixel direction
            float gradientAngle = atan(dir.y, dir.x);
            
            // Map the angle to the range [0, 2 * pi]
            gradientAngle = mod(gradientAngle - angle + 2.0 * 3.14159265359, 2.0 * 3.14159265359);
            
            // Normalize the angle to [0, 1]
            float position = gradientAngle / (2.0 * 3.14159265359);
            
            int index = 0;
            for (int i = 0; i < numColorStops - 1; i++) {
                if (position >= colorPositions[i] && position <= colorPositions[i + 1]) {
                    index = i;
                    break;
                }
            }
            
            vec4 color1 = colorStops[index];
            vec4 color2 = colorStops[index + 1];
            float t = (position - colorPositions[index]) / (colorPositions[index + 1] - colorPositions[index]);
            return mix(color1, color2, t);
        }
    `;
    
    static createGradientShaderSource(gradient: GradientColor) {
        const vertexShader = `
            vec4 position(mat4 transform_projection, vec4 vertex_position)
            {
                return transform_projection * vertex_position;
            }
        `;
        
        let fragmentShader = "";
        if(gradient.gradientType == "linear") {
            fragmentShader = ShaderFactory.linearFragmentShader(gradient);
        }
        else if(gradient.gradientType == "conic") {
            fragmentShader = ShaderFactory.conicalFragmentShader(gradient);
        }


        return { vertexShader, fragmentShader };
    }
}