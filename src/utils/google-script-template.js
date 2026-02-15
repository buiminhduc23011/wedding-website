/**
 * Google Apps Script to handle Wedding RSVP
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code completely, replacing existing code.
 * 4. Save (Ctrl+S)
 * 5. Run the 'setup()' function once to create headers.
 *    - Click 'Run' button.
 *    - Accept permissions (Review permissions > Choose account > Advanced > Go to... (unsafe) > Allow).
 * 6. Click 'Deploy' > 'New deployment'.
 * 7. Select type: 'Web app'.
 * 8. Description: 'Wedding RSVP'.
 * 9. Execute as: 'Me'.
 * 10. Who has access: 'Anyone' (IMPORTANT!).
 * 11. Click 'Deploy'.
 * 12. Copy the 'Web app URL' and send it to the developer.
 */

function doPost(e) {
    var lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        var doc = SpreadsheetApp.getActiveSpreadsheet();
        var sheet = doc.getSheetByName('RSVP');

        if (!sheet) {
            sheet = doc.insertSheet('RSVP');
            var headers = ['Timestamp', 'Name', 'Phone', 'Attending', 'Wishes'];
            sheet.appendRow(headers);
        }

        var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        var nextRow = sheet.getLastRow() + 1;

        var newRow = headers.map(function (header) {
            if (header === 'Timestamp') return new Date();

            // Map incoming JSON data to headers
            // Expecting JSON payload: { "Name": "...", "Phone": "...", ... }
            var paramName = header;
            // Simple mapping logic: simple headers match JSON keys
            try {
                var existingData = JSON.parse(e.postData.contents);
                return existingData[header] || '';
            } catch (err) {
                return 'Error parsing JSON';
            }
        });

        sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    finally {
        lock.releaseLock();
    }
}

function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName('RSVP');
    if (!sheet) {
        sheet = doc.insertSheet('RSVP');
    }
    var headers = ['Timestamp', 'Name', 'Phone', 'Attending', 'Wishes'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
}
