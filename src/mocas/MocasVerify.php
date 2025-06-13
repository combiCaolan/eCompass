<?php
    // Sanitize and fetch POST variables
    $serial      = isset($_POST["SerialNumber"]) ? $_POST["SerialNumber"] : '';
    $username    = isset($_POST["Username"]) ? $_POST["Username"] : '';
    $accessLevel = isset($_POST["AccessLevel"]) ? $_POST["AccessLevel"] : '';
    $moduleId    = isset($_POST["IndexNumber"]) ? $_POST["IndexNumber"] : '';
    $module      = isset($_POST["Module"]) ? $_POST["Module"] : '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>MOcAS Verify</title>
</head>
<body>
    <div id="HeaderMockup">
        <?php
            echo "<strong>Serial Number:</strong> " . htmlspecialchars($serial) . "<br>";
            // Pass moduleId to JS safely
            echo "<script>const NewVarCaolan = " . json_encode($moduleId) . ";</script>";
        ?>
    </div>
    <input type="submit" value="Finished" onclick="changeModules()" />

    <script>
        function changeModules() {
            const toFind = String(NewVarCaolan);
            const parameters = sessionStorage.getItem('Parameters') || '';
            const lines = parameters.split('\n');
            let updated = false;

            for (let i = 0; i < lines.length; i++) {
                const parts = lines[i].split(',');
                if (parts[0] === toFind) {
                    // Update the line as needed
                    const newLine = [
                        parts[0], '1', '1', parts[3], parts[4], parts[5], parts[6], parts[7], parts[8], parts[9], parts[10]
                    ].join(',');
                    lines[i] = newLine;
                    updated = true;
                    break;
                }
            }

            if (updated) {
                sessionStorage.setItem('Parameters', lines.join('\n'));
                location.href = '../../public/parameter-editor.html';
            } else {
                alert('Module not found in parameters.');
            }
        }
    </script>
</body>
</html>