import { LocalizationSetup } from './LocalizationManager.js';
import { CharacterSetup } from './CharacterManager.js';

async function Load() {
    await LocalizationSetup();
    await CharacterSetup();
}

Load();