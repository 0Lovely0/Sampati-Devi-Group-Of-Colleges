using System.ComponentModel.DataAnnotations;

namespace SampatiGroup .Data.Entities
{
    public class StaffMaster
    {
        [Key]
        public int staff_id { get; set; }

        public string staff_name { get; set; }
        public string staff_mobile { get; set; }
        public string staff_email { get; set; }
        public string staff_address { get; set; }
        public string staff_country { get; set; }
        public string staff_state { get; set; }
        public string staff_city { get; set; }
        public string staff_dept { get; set; }
        public string staff_type { get; set; }
        public string staff_group { get; set; }
        public string staff_stream { get; set; }
        public string staff_gender { get; set; }
        public string staff_photo { get; set; }

        public DateTime? staff_date { get; set; }
        public DateTime? staff_resigndate { get; set; }

        public bool? staff_status { get; set; }
        public string staff_attandence { get; set; }
        public string staff_des { get; set; }
        public string staff_cat { get; set; }
        public string staff_resume { get; set; }
        public string staff_qualification { get; set; }

        public DateTime? staff_joining_date { get; set; }
        public DateTime? DOR { get; set; }

        public string staff_Seniority_no { get; set; }
        public string uploaded_by { get; set; }
        public string staff_session { get; set; }
    }
}
