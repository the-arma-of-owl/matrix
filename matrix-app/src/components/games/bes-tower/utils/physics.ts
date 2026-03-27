import { BlockEntity } from './config';

/**
 * Validates the balance of a tower of blocks.
 * Uses Center of Mass logic to determine if the tower tips over.
 * Returns true if stable, false if tipped.
 */
export function checkTowerBalance(blocks: BlockEntity[]): boolean {
    if (blocks.length < 2) return true;

    for (let i = 1; i < blocks.length; i++) {
        let totalMass = 0;
        let comX = 0;
        
        for (let j = i; j < blocks.length; j++) {
            totalMass += blocks[j].mass;
            comX += blocks[j].x * blocks[j].mass;
        }
        
        comX /= totalMass;
        
        const support = blocks[i - 1];
        const leftBound = support.x - support.width / 2;
        const rightBound = support.x + support.width / 2;
        
        if (comX <= leftBound || comX >= rightBound) {
            return false;
        }
    }
    
    return true;
}
