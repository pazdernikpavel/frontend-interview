import { LoginEffects } from './effects/login.effects';
import { PersistanceEffects } from './effects/persistance.effects';
import { SignUpEffects } from './effects/sign-up.effects';

export const authEffects = [PersistanceEffects, SignUpEffects, LoginEffects];
