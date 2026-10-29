const fileNames = ['luuk.json'];
const folderPath = '../characterData/';

export async function CharacterSetup() {
    try {
        const results = await Promise.all(fileNames.map(async (fileName) => {
            const response = await fetch(`${folderPath}${fileName}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${fileName}: ${response.statusText}`);
            }
            return {
                id: fileName.replace(".json", ""),   
                data: await response.json()
            };
        }));

        const allData = Object.fromEntries(results.map(r => [r.id, r.data]));

        UpdateCharacterShowings(allData);
        return allData;
    } catch (error) {
        console.error("Error setting up characters:", error);
    }
}

export function UpdateCharacterShowings(allData) {
    const units = document.getElementsByClassName("unit");
    if (units.length === 0) {  
        console.warn("No Units???????????");
        return;
    }

    for (const unit of units) {
        for (const child of unit.children) {
            switch (child.className) {
                case "unit-name":
                    SetName(child, allData[unit.id]);
                    break;
                case "unit-img":
                    SetImage(child, allData[unit.id]);
                    break;
            }
        }
    }
}

function SetImage(element, character) {
    if (!character) {
        console.warn(`No data for "${element.id}"`);
        return;
    }
    element.src = character.img;
}

function SetName(element, character) {
    if (!character) return;
    element.textContent = character.locName;
}