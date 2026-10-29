const SUPPORTED = ["en", "pt-br", "de"];
const DEFAULT_LANG = "en";

function GetLanguage() {
    for (const raw of navigator.languages) {
                                                //String calcs suck
        const full = raw.toLowerCase();         // "pt-BR" -> "pt-br"
        const base = full.split("-")[0];        // "de-DE" -> "de"

        if (SUPPORTED.includes(full)) return full;
        if (SUPPORTED.includes(base)) return base;
    }
    return DEFAULT_LANG;
}

async function LoadJson() {
    try {
        const response = await fetch("translationData/main.json");
        return await response.json();
    } 
    catch (error) {
        console.error("Failed to load localization sheet", error);
        return null;
    }
}

export async function LocalizationSetup() {
    const lang = GetLanguage();
    const json = await LoadJson();

    if (!json) return;

    document.documentElement.lang = lang;
    document.title = json.title[lang] ?? json.title[DEFAULT_LANG];

    TranslateHeader(document.title);
    console.log("Localization setup complete:", lang);
}

function TranslateHeader(title) {
    document.getElementById("Title").textContent = title;
}