/*
ArrivalProcedure
Interview
Interviewed
Exit Terminal
On route
Briefing
Quarantine
SwabPertama
SwabKedua
 */
function progressStatus(status, role = "") {
  if(status == "ArrivalProcedure" && role == "OfficerAirport") {
    return "Interview";
  }
  if(status == "Interview" && role == "OfficerAirport") {
    return "Interviewed";
  }
  if(status == "Interviewed" && role == "OfficerAirport") {
    return "Exit Terminal";
  }
  if(status == "Exit Terminal" && (role == "DriverHotel" || role == "DriverWisma")) {
    return "On route";
  }
  if(status == "On route" && (role == "OfficerHotel" || role == "OfficerWisma")) {
    if(role == "OfficerWisma"){
      return "Briefing";
    } else {
      return "Quarantine";
    }
  }
  if(status == "Briefing" && role == "OfficerWisma") {
    return "Quarantine";
  }
  if(status == "Quarantine" && role == "HealthOfficial") {
    return "1st Swab";
  }
  if(status == "1st Swab" && role == "HealthOfficial") {
    return "2nd Swab";
  }
  if(status == "2nd Swab" && (role == "OfficerHotel" || role == "OfficerWisma")) {
    return "Finished";
  }
  return ""
}

module.exports = progressStatus;