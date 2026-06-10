// hanle with RHF

const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: {
    emailNotifications: true,
    pushNotifications: false,
    securityAlerts: true,
  },
});



// main call

<div className="card">
  <h3>Email Notifications</h3>

  <FormSwitch
    control={form.control}
    name="emailNotifications"
  />
</div>

<div className="card">
  <h3>Push Notifications</h3>

  <FormSwitch
    control={form.control}
    name="pushNotifications"
  />
</div>

<div className="card">
  <h3>Security Alerts</h3>

  <FormSwitch
    control={form.control}
    name="securityAlerts"
  />
</div>