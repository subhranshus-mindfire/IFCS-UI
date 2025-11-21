import { useState, useRef, useMemo, type FC } from 'react';
import { type ThreeEvent } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';



// Placeholder for ToogleSwitch
export const ToogleSwitch: FC = () => {
    const [isOn, setIsOn] = useState(false);
    return (
        <button
            onClick={() => setIsOn(!isOn)}
            className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors duration-300 ${isOn ? 'bg-blue-600' : 'bg-gray-300'}`}
            aria-checked={isOn}
        >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isOn ? 'translate-x-4' : 'translate-x-0'}`}></div>
        </button>
    );
};


interface DrawerProps {
    position: [number, number, number];
    drawerNumber: number;
    isSelected: boolean;
    onClick: (e: ThreeEvent<MouseEvent>) => void;
    isOpen: boolean;
}

interface CartBodyProps {
    drawerCount: number;
}

interface DrawerCartProps {
    drawerCount?: number;
    onDrawerSelect: (drawerNumber: number) => void;
    selectedDrawer: number;
}

export const Lighting: FC = () => (
    <>
        <ambientLight intensity={0.6} />
        <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 5, 2]} intensity={0.3} />
    </>
);

const Drawer: FC<DrawerProps> = ({ position, drawerNumber, isSelected, onClick, isOpen }) => {
    const drawerRef = useRef<THREE.Mesh>(null);

    // Animation for drawer opening/closing (0 to 1.5 units along Z axis)
    const { zOffset } = useSpring({
        zOffset: isOpen ? 1.5 : 0,
        config: { tension: 200, friction: 25 }
    });

    return (
        <group position={position}>
            {/* Use animated.group to apply Z animation to the whole drawer unit. */}
            {/* We are removing `as any` and relying on @react-spring/three types to correctly handle `position-z` on `animated.group`. */}
            <animated.group position-z={zOffset} onClick={onClick}>
                {/* Drawer Body - the main rectangular box */}
                <mesh
                    ref={drawerRef}
                    castShadow
                >
                    <boxGeometry args={[3, 0.8, 1.2]} />
                    <meshStandardMaterial
                        color={isSelected ? "#60A5FA" : "#9CA3AF"} // blue-400 / gray-400
                        roughness={0.3}
                        metalness={0.1}
                    />
                </mesh>


                {/* Drawer Label Text */}
                <Text
                    position={[0, 0, 0.61]}
                    fontSize={0.2}
                    color="#1F2937"
                    anchorX="center"
                    anchorY="middle"
                >
                    Drawer {drawerNumber}
                </Text>
            </animated.group>
        </group>
    );
};

/** Cart Body Component (the main cabinet structure) */
const CartBody: FC<CartBodyProps> = ({ drawerCount }) => {
    const bodyHeight = useMemo(() => drawerCount * 1 + 1, [drawerCount]);
    const topPanelHeight = 0.7;
    const bodyCenterY = bodyHeight / 2;

    return (
        <group>
            {/* Back, Left, Right, Bottom Panels */}
            <mesh position={[0, bodyCenterY, -0.6]}><boxGeometry args={[3.2, bodyHeight, 0.1]} /><meshStandardMaterial color="#D1D5DB" /></mesh>
            <mesh position={[-1.55, bodyCenterY, 0]}><boxGeometry args={[0.1, bodyHeight, 1.3]} /><meshStandardMaterial color="#D1D5DB" /></mesh>
            <mesh position={[1.55, bodyCenterY, 0]}><boxGeometry args={[0.1, bodyHeight, 1.3]} /><meshStandardMaterial color="#D1D5DB" /></mesh>
            <mesh position={[0, -0.1, 0]}><boxGeometry args={[3.2, 0.1, 1.3]} /><meshStandardMaterial color="#9CA3AF" /></mesh>

            {/* Top Panel - "Loose Items" Section */}
            <mesh position={[0, bodyHeight + topPanelHeight / 2, 0]}>
                <boxGeometry args={[3.2, topPanelHeight, 1.3]} />
                <meshStandardMaterial color="#E5E7EB" />
            </mesh>

            {/* Top Label */}
            <Text
                position={[0, bodyHeight + topPanelHeight / 2 + 0.05, 0.66]}
                fontSize={0.15}
                color="#374151"
                anchorX="center"
                anchorY="middle"
            >
                Loose Items
            </Text>
        </group>
    );
};

/**Main DrawerCart Component */
export const DrawerCart: FC<DrawerCartProps> = ({ drawerCount = 3, onDrawerSelect, selectedDrawer }) => {
    return (
        <group position={[0, -2, 0]}>
            <CartBody drawerCount={drawerCount} />

            {/* Generate drawers dynamically based on drawerCount */}
            {Array.from({ length: drawerCount }).map((_, index) => {
                const drawerNumber = drawerCount - index;
                const yPosition = index * 1 + 0.5;

                return (
                    <Drawer
                        key={drawerNumber}
                        position={[0, yPosition, 0]}
                        drawerNumber={drawerNumber}
                        isSelected={selectedDrawer === drawerNumber}
                        isOpen={selectedDrawer === drawerNumber}
                        onClick={(e) => {
                            e.stopPropagation();
                            onDrawerSelect(drawerNumber);
                        }}
                    />
                );
            })}
        </group>
    );
};