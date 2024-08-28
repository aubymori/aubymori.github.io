const GUID_REGEX = /^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/;
const GUID_INPUT = document.getElementById("guid-to-bytes-guid");

function guidToBytes(guid)
{
    let text = guid.replace(/(^{|}$)/g, "");
    let output = "";

    // First part
    output += text.substr(6, 2);
    output += text.substr(4, 2);
    output += text.substr(2, 2);
    output += text.substr(0, 2);

    // Second part
    output += text.substr(11, 2);
    output += text.substr(9, 2);
    
    // Third part
    output += text.substr(16, 2);
    output += text.substr(14, 2);

    // Fourth part
    output += text.substr(19, 4);

    // Fifth part
    output += text.substr(24, 12);

    return output;
}

GUID_INPUT.addEventListener("input", () => {
    let text = GUID_INPUT.value;
    let out = document.getElementById("guid-out");
    if (text == "")
    {
        out.value = "";
        return;
    }
    if (GUID_REGEX.test(text))
    {
        out.value = guidToBytes(text);
    }
    else
    {
        out.value = "Invalid GUID";
    }
});

const DEFINE_GUID_NAME = document.getElementById("define-guid-name");
const DEFINE_GUID_GUID = document.getElementById("define-guid-guid");

function defineGuid(name, guid)
{
    let text = guid.replace(/(^{|}$)/g, "");
    let output = `DEFINE_GUID(${name}, `;

    // First part
    output += `0x${text.substr(0, 8)}, `;

    // Second part
    output += `0x${text.substr(9, 4)}, `;

    // Third part
    output += `0x${text.substr(14, 4)}, `;

    // Fourth part
    output += `0x${text.substr(19, 2)},0x${text.substr(21, 2)}, `;

    // Fifth part
    output += `0x${text.substr(24, 2)},`;
    output += `0x${text.substr(26, 2)},`;
    output += `0x${text.substr(28, 2)},`;
    output += `0x${text.substr(30, 2)},`;
    output += `0x${text.substr(32, 2)},`;
    output += `0x${text.substr(34, 2)}`;
    

    output += ");";
    return output;
}

function updateDefineGuid()
{
    let name = DEFINE_GUID_NAME.value;
    let guid = DEFINE_GUID_GUID.value;
    let out = document.getElementById("define-guid-out");

    if (name == "" || guid == "")
    {
        out.textContent = "";
        return;
    }

    if (GUID_REGEX.test(guid))
    {
        out.textContent = defineGuid(name, guid);
    }
    else
    {
        out.textContent = "Invalid GUID";
    }
}

DEFINE_GUID_NAME.addEventListener("input", updateDefineGuid);
DEFINE_GUID_GUID.addEventListener("input", updateDefineGuid);