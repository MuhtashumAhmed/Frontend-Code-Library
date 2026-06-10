export type stage =
  | "kyc_verification"
  | "credit_scoring"
  | "final_verification";


export const stageStyles: Record<stage, { label: string; className: string }> =
  {
    kyc_verification: {
      label: "KYC Verification",
      className: "bg-[#4648D41A] text-[#E63A2E]  ",
    },
    credit_scoring: {
      label: "Credit Scoring",
      className: "bg-[#DAE2FD80] text-[#565E74]  ",
    },
    final_verification: {
      label: "Final Verification",
      className: "bg-[#E0E3E5] text-[#444749]  ",
    },
  };


export const employeeLoanApplicationsTableData = [
  {
    app_id: "CW-89241",
    profile: "/manager-dashboard/profile.jpg",
    agent_name: "Hana Rizvi",
    current_stage: "kyc_verification",
    time_in_stage: "2h 15m",
    priority_level: "High",
  },
  {
    app_id: "CW-89242",
    profile: "/manager-dashboard/profile.jpg",
    agent_name: "Michael Chen",
    current_stage: "credit_scoring",
    time_in_stage: "1d 4h",
    priority_level: "Medium",
  },
  {
    app_id: "CW-89246",
    profile: "/manager-dashboard/profile.jpg",
    agent_name: "Jane Doe",
    current_stage: "final_verification",
    time_in_stage: "45m",
    priority_level: "Critical",
  },
  {
    app_id: "CW-89249",
    profile: "/manager-dashboard/profile.jpg",
    agent_name: "David Smith",
    current_stage: "kyc_verification",
    time_in_stage: "15m",
    priority_level: "Low",
  },
];


export const employeeLoanApplicationsTableColumns = [
  {
    accessorKey: "app_id",
    header: ({ column }: any) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" gap-1! capitalize     text-wrap!    "
        >
          app id
          <ArrowUpDown className=" h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }: any) => {
      const app_id = row.getValue("app_id");
      return <span className="text-myRed font-bold">{app_id}</span>;
    },
  },


  {
    accessorKey: "assigned_agent",
    header: ({ column }: any) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" gap-1! capitalize     text-wrap!    "
        >
          assigned agent
          <ArrowUpDown className=" h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }: any) => {
      const agent_name = row.original.agent_name;
      const profile = row.original.profile;


      return (
        <div className="flex gap-2 items-center">
          <Image
            src={profile}
            alt="profile"
            height={24}
            width={24}
            className="rounded-full"
          />


          <span className={`text-myBluishColor font-normal`}>{agent_name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "current_stage",
    header: ({ column }: any) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className=" gap-1! capitalize     text-wrap!    "
      >
        current stage
        <ArrowUpDown className=" h-3 w-3" />
      </Button>
    ),
    cell: ({ row }: any) => {
      const status = row.getValue("current_stage") as stage;
      const config = stageStyles[status];
      //   const isWarning = config.label.toLowerCase() === "warning";
      return (
        <div
          className={`inline-flex  rounded-md capitalize text-center gap-1 px-3 py-1.5 text-xs font-semibold ${config.className}`}
        >
          {config.label}
        </div>
      );
    },
  },


  {
    accessorKey: "time_in_stage",
    header: ({ column }: any) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className=" gap-1! capitalize     text-wrap!    "
      >
        time in stage
        <ArrowUpDown className=" h-3 w-3" />
      </Button>
    ),
  },
  {
    accessorKey: "priority_level",
    header: ({ column }: any) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className=" gap-1! capitalize     text-wrap!    "
      >
        priority level
        <ArrowUpDown className=" h-3 w-3" />
      </Button>
    ),
    cell: ({ row }: any) => {
      const priority_level = row.getValue("priority_level") as string;


      const level = priority_level.toLowerCase();
      const isHigh = level === "high" || level === "critical";
      const isLow = level === "low";


      return (
        <div
          className={`font-semibold text-xs flex items-center gap-2 ${
            isHigh
              ? "text-[#BA1A1A]"
              : isLow
                ? "text-[#64748B]"
                : "text-[#D97706]"
          }`}
        >
          <span
            className={`h-2 w-2 block rounded-full ${
              isHigh ? "bg-[#BA1A1A]" : isLow ? "bg-[#64748B]" : "bg-[#D97706]"
            } `}
          />
          {priority_level}
        </div>
      );
    },
  },


  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }: any) => {
      //   const id = row.getValue("loan_id");
      return (
        <Popover>
          <PopoverTrigger asChild>
            {/* <Button variant="outline">Open Popover</Button> */}
            <button className="cursor-pointer">
              <EllipsisVertical />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="  gap-3 flex flex-wrap    ">
              {/* <Link href={`/client/active-loans/${id}`}> */}
              <Link href="#">
                <EyeIcon />
              </Link>
              <button>
                <MessageIcon className="text-[#FFCC00]" />
              </button>
              <Button className="capitalize cursor-pointer bg-myRed!">
                cancel
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      );
    },
  },
];
